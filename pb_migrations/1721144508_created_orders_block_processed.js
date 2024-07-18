/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ya18r70h1809giq",
    "created": "2024-07-16 15:41:48.825Z",
    "updated": "2024-07-16 15:41:48.825Z",
    "name": "orders_block_processed",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sqi2a2eq",
        "name": "block_color",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "pbmoszyv",
        "name": "block_departure_elements",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "p27rkuiu",
        "name": "block_paper",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "kn9m4r2t",
        "name": "block_printer",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "0r7erne2",
        "name": "block_multiplicity",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "yclnnpij",
        "name": "block_format",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  id,\n  block_color,\n  block_departure_elements,\n  block_paper,\n  block_printer,\n  block_multiplicity,\n  block_format\nFROM (\n  SELECT\n    o.id as id,\n    block_colors.name as block_color,\n    o.block_departure_elements as block_departure_elements,\n    block_papers.name as block_paper,\n    block_printers.name as block_printer,\n    bfr.multiplicity as block_multiplicity,\n    (CASE\n      WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n      ELSE bfr.format_wo_departure_elements\n    END) as block_format\n  FROM orders o,\n      order_types ot,\n      colors block_colors,\n      papers block_papers,\n      printers block_printers,\n      block_format_rules bfr,\n      json_each(bfr.format) as bfr_format,\n      json_each(bfr.printer) as bfr_printer\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bfr_format.value = o.format\n  AND   bfr_printer.value = o.block_printer\n  AND   block_colors.id = o.block_color\n  AND   block_papers.id = o.block_paper\n  AND   block_printers.id = o.block_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_color,\n    NULL as block_departure_elements,\n    NULL as block_paper,\n    NULL as block_printer,\n    NULL as block_multiplicity,\n    NULL as block_format\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ya18r70h1809giq");

  return dao.deleteCollection(collection);
})
