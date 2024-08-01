/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4soxst3o47zmsex",
    "created": "2024-08-01 11:24:51.940Z",
    "updated": "2024-08-01 11:24:51.940Z",
    "name": "spring_fastenings_rules",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qbsjzjid",
        "name": "block_product_column_height",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "ntsiho2s",
        "name": "spring_diameter",
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
  const collection = dao.findCollectionByNameOrId("4soxst3o47zmsex");

  return dao.deleteCollection(collection);
})
