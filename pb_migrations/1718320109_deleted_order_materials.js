/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ol0o57xub0vdt5n",
    "created": "2024-06-13 21:16:36.318Z",
    "updated": "2024-06-13 22:43:47.734Z",
    "name": "order_materials",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "j6ayvhzg",
        "name": "block_color",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "otyj355fus3kaxb",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
      "query": "WITH estimated_circulation_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT\n  o.id as id,\n  o.block_color as block_color\nFROM orders o, estimated_circulation_calc ecc\nWHERE o.id = ecc.id"
    }
  });

  return Dao(db).saveCollection(collection);
})
