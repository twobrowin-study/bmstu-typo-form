/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "buic5j8825frmrd",
    "created": "2024-07-11 05:42:19.478Z",
    "updated": "2024-07-11 05:42:19.478Z",
    "name": "available_cover",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lx06dlgj",
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
        "id": "yjyrfetq",
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
        "id": "lpezdgvb",
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
      "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN NOT p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE NULL\n    END) as non_avaliable_message\n  FROM orders o,\n       papers p\n  WHERE p.id = o.cover_paper\n)\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd");

  return dao.deleteCollection(collection);
})
