/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("td90izw5fh6wk2a");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "td90izw5fh6wk2a",
    "created": "2024-08-01 20:25:26.821Z",
    "updated": "2024-08-01 20:25:26.821Z",
    "name": "test",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dz4rrq7q",
        "name": "order_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "wqjj2mpzk0zikk1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "rkletqng",
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
        "id": "05im6it2",
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
        "id": "cqlrtjcw",
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
        "id": "xl80ghga",
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
        "id": "5izdpkdg",
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
        "id": "vea8rqij",
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
        "id": "uncojl0n",
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
      "query": "  SELECT\n    concat(o.id, '_summ') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    150 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'"
    }
  });

  return Dao(db).saveCollection(collection);
})
