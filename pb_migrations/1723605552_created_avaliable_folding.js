/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hcbdtlc0p2htrs8",
    "created": "2024-08-14 03:19:12.390Z",
    "updated": "2024-08-14 03:19:12.390Z",
    "name": "avaliable_folding",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cgvdrqux",
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
        "id": "koxwktji",
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
        "id": "hklxvttm",
        "name": "non_available_message",
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
      "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message\nFROM (\n      SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберите вид изделия\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_block as is_available,\n    (CASE\n      WHEN NOT ot.has_block THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_folding\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hcbdtlc0p2htrs8");

  return dao.deleteCollection(collection);
})
