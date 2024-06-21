/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6lws3vcqcvs3ewy",
    "created": "2024-06-12 14:39:41.292Z",
    "updated": "2024-06-12 14:39:41.292Z",
    "name": "fastening_rules",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hqnpozfh",
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
        "id": "sra0nkbr",
        "name": "append_transparent_elements",
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
  const collection = dao.findCollectionByNameOrId("6lws3vcqcvs3ewy");

  return dao.deleteCollection(collection);
})
