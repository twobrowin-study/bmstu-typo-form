/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "s57yyb0fdj96zxf",
    "created": "2024-07-16 21:00:59.503Z",
    "updated": "2024-07-16 21:00:59.503Z",
    "name": "orders_conver_calc",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wou1pr5j",
        "name": "cover_full_sheets",
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
        "id": "sj5b8cab",
        "name": "cover_ofset_forms",
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
        "id": "7ua2o4ly",
        "name": "cover_product_column_height",
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
      "query": "SELECT\n  id,\n  cover_full_sheets,\n  cover_ofset_forms,\n  cover_product_column_height\nFROM (\n  SELECT\n    o.id as id,\n    ceiling((oec.estimated_circulation)/(ocp.cover_multiplicity*cc.print_side_num)) as cover_full_sheets,\n    (CASE\n      WHEN cp.is_ofset THEN cc.ofset_from_num + 1\n      ELSE NULL\n    END) as cover_ofset_forms,\n    ceiling((oec.estimated_circulation)/(ocp.cover_multiplicity))*cpp.thickness as cover_product_column_height\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc,\n      printers cp,\n      papers cpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n  AND   cp.id = o.cover_printer\n  AND   cpp.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_full_sheets,\n    NULL as cover_ofset_forms,\n    NULL as cover_product_column_height\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s57yyb0fdj96zxf");

  return dao.deleteCollection(collection);
})
