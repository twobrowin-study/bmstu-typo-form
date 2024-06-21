/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nafzd23cgj1s6d3");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "nafzd23cgj1s6d3",
    "created": "2024-06-17 13:58:38.660Z",
    "updated": "2024-06-17 16:41:09.951Z",
    "name": "report_sections",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "guzpgjss",
        "name": "name",
        "type": "text",
        "required": true,
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
        "id": "wozje7rd",
        "name": "order",
        "type": "number",
        "required": true,
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
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
