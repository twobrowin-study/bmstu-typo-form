/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "0b7xjas5z191uic",
    "created": "2024-06-16 23:22:33.858Z",
    "updated": "2024-07-11 13:16:48.196Z",
    "name": "orders_estimated_circulations",
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
