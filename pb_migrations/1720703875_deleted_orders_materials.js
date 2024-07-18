/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "xd3hvu20iithlaq",
    "created": "2024-06-14 00:46:40.631Z",
    "updated": "2024-07-11 13:16:41.618Z",
    "name": "orders_materials",
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
