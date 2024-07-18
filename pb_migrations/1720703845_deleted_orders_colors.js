/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sleziq6ago64l8w");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "sleziq6ago64l8w",
    "created": "2024-06-16 23:47:35.414Z",
    "updated": "2024-07-11 13:17:01.114Z",
    "name": "orders_colors",
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
