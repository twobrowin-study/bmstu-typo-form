/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0fpp5sd24bya0kh",
    "created": "2024-06-30 22:33:49.530Z",
    "updated": "2024-06-30 22:33:49.530Z",
    "name": "available_cover_departure_elements",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ic6w5xsv",
        "name": "is_avaliable",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "xmgnaeur",
        "name": "non_avaliable_message",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  o.id as id,\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0fpp5sd24bya0kh");

  return dao.deleteCollection(collection);
})
