/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1wsvcmoq1q4l6w2",
    "created": "2024-07-11 05:02:58.518Z",
    "updated": "2024-07-11 05:02:58.518Z",
    "name": "cover_laminations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ilgurycx",
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
        "id": "fgon8mxo",
        "name": "is_empty",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "rvhmix0j",
        "name": "side_num",
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
  const collection = dao.findCollectionByNameOrId("1wsvcmoq1q4l6w2");

  return dao.deleteCollection(collection);
})
