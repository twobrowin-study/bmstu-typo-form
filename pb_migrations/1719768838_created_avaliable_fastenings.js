/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "psdddeb14thhxan",
    "created": "2024-06-30 17:33:58.074Z",
    "updated": "2024-06-30 17:33:58.074Z",
    "name": "avaliable_fastenings",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yvnvsbwa",
        "name": "order_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "wqjj2mpzk0zikk1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "4pcqj4md",
        "name": "fastening_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "6lws3vcqcvs3ewy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "tjdjiq5p",
        "name": "fastening_name",
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
        "id": "nzrofltt",
        "name": "fastening_order",
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
    "options": {
      "query": "SELECT\n  concat(o.id, fastenings.id) as id,\n  o.id as order_id,\n  fastenings.id as fastening_id,\n  fastenings.name as fastening_name,\n  fastenings.\"order\" as fastening_order\nFROM orders o,\n     fastenings"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan");

  return dao.deleteCollection(collection);
})
