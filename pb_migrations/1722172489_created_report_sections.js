/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lt9sfijiogs8bpp",
    "created": "2024-07-28 13:14:49.228Z",
    "updated": "2024-07-28 13:14:49.228Z",
    "name": "report_sections",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qcerswxi",
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
        "id": "axvlxkk8",
        "name": "order",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lt9sfijiogs8bpp");

  return dao.deleteCollection(collection);
})
