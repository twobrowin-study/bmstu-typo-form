/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "otyj355fus3kaxb",
    "created": "2024-06-12 13:31:08.403Z",
    "updated": "2024-06-12 13:31:08.403Z",
    "name": "block_colors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "d4qd6w4d",
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
        "id": "wznuednv",
        "name": "is_risograph_available",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "df1t1otv",
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
  const collection = dao.findCollectionByNameOrId("otyj355fus3kaxb");

  return dao.deleteCollection(collection);
})
