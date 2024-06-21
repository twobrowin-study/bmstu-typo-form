/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "rtvjsbojf2znktb",
    "created": "2024-06-12 15:13:32.886Z",
    "updated": "2024-06-12 15:13:32.886Z",
    "name": "formats",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2ounq2ya",
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
        "id": "1piy8adh",
        "name": "brace_max_pages",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
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
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb");

  return dao.deleteCollection(collection);
})
