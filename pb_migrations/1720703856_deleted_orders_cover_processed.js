/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ipm51j9auiamr0f",
    "created": "2024-06-30 12:34:33.412Z",
    "updated": "2024-07-11 13:16:55.454Z",
    "name": "orders_cover_processed",
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
