/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0b7xjas5z191uic",
    "created": "2024-06-16 23:22:33.858Z",
    "updated": "2024-06-16 23:22:33.858Z",
    "name": "orders_pre_calc",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lsow3lei",
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
      "query": "  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic");

  return dao.deleteCollection(collection);
})
