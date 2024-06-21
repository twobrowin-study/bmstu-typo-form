/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gq0cdj9ta2cbq35",
    "created": "2024-06-12 13:24:31.660Z",
    "updated": "2024-06-12 13:24:31.660Z",
    "name": "cover_papers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cjlgtoan",
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
        "id": "u8fefpcn",
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
  const collection = dao.findCollectionByNameOrId("gq0cdj9ta2cbq35");

  return dao.deleteCollection(collection);
})
