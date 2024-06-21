/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wo478d0kqiy4j48",
    "created": "2024-06-12 13:22:00.672Z",
    "updated": "2024-06-12 13:22:00.672Z",
    "name": "block_papers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rzewn53m",
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
        "id": "uwrhpm14",
        "name": "is_risograph_available",
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
  const collection = dao.findCollectionByNameOrId("wo478d0kqiy4j48");

  return dao.deleteCollection(collection);
})
