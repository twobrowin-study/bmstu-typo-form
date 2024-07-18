/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "cgria5csrq3owum",
    "created": "2024-07-16 19:05:59.113Z",
    "updated": "2024-07-16 19:05:59.113Z",
    "name": "difficulty_groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "otzqob7a",
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
        "id": "1pwsjxwt",
        "name": "price",
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
  const collection = dao.findCollectionByNameOrId("cgria5csrq3owum");

  return dao.deleteCollection(collection);
})
