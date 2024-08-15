/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nfjqu5ln5r8yykc",
    "created": "2024-08-15 08:50:56.092Z",
    "updated": "2024-08-15 08:50:56.092Z",
    "name": "report_fields_sum",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7tfqplq9",
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
        "id": "iz9xzkvr",
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
        "id": "2wdyktw5",
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
        "id": "ngzxrbyu",
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
        "id": "hzkr2ha1",
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
        "id": "bbtdmtsk",
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
        "id": "bnatjg4p",
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
        "id": "6h9kbssw",
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
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    400 as \"order\",\n    'Общая стоимость' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    rms.cost + rws.cost*7 as cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms,\n       report_works_sum rws\n  WHERE rms.order_id = o.id\n  AND   rws.order_id = o.id\n  AND   ot.id = o.type\n)\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nfjqu5ln5r8yykc");

  return dao.deleteCollection(collection);
})
