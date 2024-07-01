/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "g0c7j6bdk44jd5u",
    "created": "2024-06-30 18:28:22.478Z",
    "updated": "2024-06-30 18:28:22.478Z",
    "name": "avaliable_formats",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dg7lzgn5",
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
        "id": "ajdphwqu",
        "name": "format_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "rtvjsbojf2znktb",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "mqqwoybb",
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
        "id": "qw5gtlew",
        "name": "order",
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
        "id": "uokswnag",
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
        "id": "pogphzj2",
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
      "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  f.id as format_id,\n  f.name as name,\n  f.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     formats f\nWHERE o.fastening = \"\" OR o.page_num = 0"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("g0c7j6bdk44jd5u");

  return dao.deleteCollection(collection);
})
