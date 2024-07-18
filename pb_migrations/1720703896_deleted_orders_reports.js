/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pt7nh5cghvenwdq");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "pt7nh5cghvenwdq",
    "created": "2024-06-17 01:05:56.257Z",
    "updated": "2024-07-11 13:15:58.196Z",
    "name": "orders_reports",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id from orders"
    }
  });

  return Dao(db).saveCollection(collection);
})
