/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5pa62hhs3hdp93d",
    "created": "2024-07-16 20:30:53.321Z",
    "updated": "2024-07-16 20:30:53.321Z",
    "name": "orders_estimated_circulation",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hxxlziwu",
        "name": "estimated_circulation",
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
      "query": "SELECT o.id as id, ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5pa62hhs3hdp93d");

  return dao.deleteCollection(collection);
})
