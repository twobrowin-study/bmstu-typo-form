/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "o80eej583nd4h5a",
    "created": "2024-07-01 00:24:26.007Z",
    "updated": "2024-07-01 00:24:26.007Z",
    "name": "avaliable_page_nums",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dr8oiyfo",
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
        "id": "tng57oc9",
        "name": "min",
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
        "id": "5ruthicd",
        "name": "step",
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
      "query": "SELECT\n  o.id as id,\n  o.id as order_id,\n  8 as \"min\",\n  (CASE\n    WHEN o.page_num <= 64 THEN 4\n    ELSE 2\n  END) as step\nFROM orders o"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o80eej583nd4h5a");

  return dao.deleteCollection(collection);
})
