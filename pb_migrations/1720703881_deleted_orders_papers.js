/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7k8x1s60alse4sy");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "7k8x1s60alse4sy",
    "created": "2024-06-16 23:36:19.424Z",
    "updated": "2024-07-11 13:16:36.138Z",
    "name": "orders_papers",
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
