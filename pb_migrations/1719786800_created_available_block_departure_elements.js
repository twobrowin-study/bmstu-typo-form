/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gwwts3f34x3bwun",
    "created": "2024-06-30 22:33:20.730Z",
    "updated": "2024-06-30 22:33:20.730Z",
    "name": "available_block_departure_elements",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mechnsgz",
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
        "id": "o2ahlcul",
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
  const collection = dao.findCollectionByNameOrId("gwwts3f34x3bwun");

  return dao.deleteCollection(collection);
})
