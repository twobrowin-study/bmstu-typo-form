/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4nnbua1ao2hmvbk",
    "created": "2024-07-11 05:38:14.774Z",
    "updated": "2024-07-11 05:38:14.774Z",
    "name": "available_block",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7yf0qcmp",
        "name": "order_id",
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
        "id": "1yzwlnxf",
        "name": "is_available",
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
        "id": "qvpnufgi",
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
      "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_block as is_available,\n    (CASE\n      WHEN NOT ot.has_block THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE NULL\n    END) as non_avaliable_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4nnbua1ao2hmvbk");

  return dao.deleteCollection(collection);
})
