/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tlytss5kj8zsn78");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "tlytss5kj8zsn78",
    "created": "2024-06-17 00:55:55.165Z",
    "updated": "2024-07-11 13:16:29.498Z",
    "name": "orders_processed",
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
