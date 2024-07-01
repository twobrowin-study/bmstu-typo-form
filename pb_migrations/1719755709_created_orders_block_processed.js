/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fxchdwbggv9j70e",
    "created": "2024-06-30 13:55:09.054Z",
    "updated": "2024-06-30 13:55:09.054Z",
    "name": "orders_block_processed",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vjuwwlxl",
        "name": "block_color",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "rab9skio",
        "name": "block_departure_elements",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "4gsm8pwx",
        "name": "block_paper",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "0ivyzfmn",
        "name": "block_printer",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ec6kvmph",
        "name": "block_multiplicity",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "xwffkjvi",
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
      "query": "SELECT\n  o.id as id,\n  block_colors.name as block_color,\n  o.block_departure_elements as block_departure_elements,\n  block_papers.name as block_paper,\n  block_printers.name as block_printer,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format\nFROM orders o,\n     colors block_colors,\n     papers block_papers,\n     printers block_printers,\n     block_format_rules bfr\nWHERE bfr.format = o.format\n  AND   block_colors.id = o.block_color\n  AND   block_papers.id = o.block_paper\n  AND   block_printers.id = o.block_printer"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fxchdwbggv9j70e");

  return dao.deleteCollection(collection);
})
