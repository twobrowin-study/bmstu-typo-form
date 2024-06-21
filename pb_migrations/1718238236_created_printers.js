/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wh0d3nkuokqcta5",
    "created": "2024-06-13 00:23:56.624Z",
    "updated": "2024-06-13 00:23:56.624Z",
    "name": "printers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fekvtx6i",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wh0d3nkuokqcta5");

  return dao.deleteCollection(collection);
})
