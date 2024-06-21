/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yuf9jzkx4zs4mwb",
    "created": "2024-06-12 13:32:03.304Z",
    "updated": "2024-06-12 13:32:03.304Z",
    "name": "covers_colors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0jqflyet",
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
      },
      {
        "system": false,
        "id": "33usminv",
        "name": "is_risograph_available",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "mzwamwl0",
        "name": "is_digital_available",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("yuf9jzkx4zs4mwb");

  return dao.deleteCollection(collection);
})
