/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ol0o57xub0vdt5n",
    "created": "2024-06-13 21:16:36.318Z",
    "updated": "2024-06-13 21:16:36.318Z",
    "name": "order_materials",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pfwxu6xh",
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
      "query": "SELECT \n  o.id as id,\n  ROUND(o.circulation*1.06+6,0) as estimated_circulation\nFROM orders o"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n");

  return dao.deleteCollection(collection);
})
