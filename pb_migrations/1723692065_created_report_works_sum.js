/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "shfnfgbi2a227by",
    "created": "2024-08-15 03:21:05.120Z",
    "updated": "2024-08-15 03:21:05.120Z",
    "name": "report_works_sum",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "llj07jji",
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
        "id": "1i8jpnwi",
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
        "id": "rveexi4w",
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
        "id": "mtcdpgdu",
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
        "id": "sxhzebhm",
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
        "id": "wzdefjm9",
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
        "id": "vfr4v8wu",
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
        "id": "hdkkz4ji",
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
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Работы итого: Листовая продукция\n  SELECT\n    concat(o.id, '_material_summ') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    301 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfwsp.cost)+rfqc.cost) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp,\n       report_works_quality_control rfqc\n  WHERE rfwsp.order_id = o.id\n  AND   rfqc.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfwsp.order_id\n\n  UNION\n\n  -- Работы итого: Брошюра\n  SELECT\n    concat(o.id, '_works_summ') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    301 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfwb.cost)+rfqc.cost) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb,\n       report_works_quality_control rfqc\n  WHERE rfwb.order_id = o.id\n  AND   rfqc.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfwb.order_id\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("shfnfgbi2a227by");

  return dao.deleteCollection(collection);
})
