/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fxchdwbggv9j70e");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "fxchdwbggv9j70e",
    "created": "2024-06-30 13:55:09.054Z",
    "updated": "2024-07-11 13:17:07.845Z",
    "name": "orders_block_processed",
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
