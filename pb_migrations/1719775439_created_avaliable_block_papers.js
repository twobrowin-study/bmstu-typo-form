/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "st9p85stn0zj7fj",
    "created": "2024-06-30 19:23:59.766Z",
    "updated": "2024-06-30 19:23:59.766Z",
    "name": "avaliable_block_papers",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "a47p45ej",
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
        "id": "gtqoe9ta",
        "name": "format_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "gq0cdj9ta2cbq35",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "tg7wpnst",
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
        "id": "rekucegv",
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
        "id": "v4ugaduu",
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
        "id": "6qg2bzgz",
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
      "query": "SELECT\n  concat(o.id, p.id) as id,\n  o.id as order_id,\n  p.id as format_id,\n  p.name as name,\n  p.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     papers p\nWHERE p.is_block_avaliable"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("st9p85stn0zj7fj");

  return dao.deleteCollection(collection);
})
