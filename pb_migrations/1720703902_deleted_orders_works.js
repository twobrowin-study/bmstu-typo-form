/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "oirv0e6qvbfq8z8",
    "created": "2024-06-17 00:42:41.642Z",
    "updated": "2024-07-11 13:16:21.967Z",
    "name": "orders_works",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id from orders"
    }
  });

  return Dao(db).saveCollection(collection);
})
