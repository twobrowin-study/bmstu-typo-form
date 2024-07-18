/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vfx2dt8zvqy8pbo",
    "created": "2024-07-11 05:32:57.129Z",
    "updated": "2024-07-11 05:32:57.129Z",
    "name": "available_order_types",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "40ychuuk",
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
        "id": "3allc0cn",
        "name": "order_type_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "1f5ieiczr37cglw",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "ptvvwvok",
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
        "id": "hnreyxms",
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
        "id": "lyfs4naw",
        "name": "is_avaliable",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "2dv7dc3i",
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
      "query": "SELECT\n  concat(o.id, ot.id) as id,\n  o.id as order_id,\n  ot.id as order_type_id,\n  ot.name as name,\n  ot.\"order\" as \"order\",\n  ot.is_active as is_avaliable,\n  (CASE\n    WHEN NOT ot.is_active THEN \" - в разработке\"\n    ELSE NULL\n  END) as non_avaliable_message\nFROM orders o,\n     order_types ot"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vfx2dt8zvqy8pbo");

  return dao.deleteCollection(collection);
})
