/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "czsw244om07yagl",
    "created": "2024-08-15 03:12:21.770Z",
    "updated": "2024-08-15 03:12:21.770Z",
    "name": "report_materials_sum",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cddjptjw",
        "name": "order_id",
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
        "id": "finmcgqc",
        "name": "section_id",
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
        "id": "r4usdkci",
        "name": "order",
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
        "id": "qnwbuuja",
        "name": "name",
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
        "id": "i64gcjgm",
        "name": "value",
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
        "id": "rtnyidc5",
        "name": "units",
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
        "id": "wvrwmc50",
        "name": "rate",
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
        "id": "pmgitsje",
        "name": "cost",
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
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Материалы итого: Листовая продукция\n  SELECT\n    concat(o.id, '_summ') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    150 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfmsp.order_id\n\n  UNION\n\n  -- Материалы итого: Брошюра\n  SELECT\n    concat(o.id, '_material_summ') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    150 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb\n  WHERE rfmb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfmb.order_id\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("czsw244om07yagl");

  return dao.deleteCollection(collection);
})
