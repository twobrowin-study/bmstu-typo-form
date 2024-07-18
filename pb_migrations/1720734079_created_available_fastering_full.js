/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "k83ym09g9l9r0pe",
    "created": "2024-07-11 21:41:19.476Z",
    "updated": "2024-07-11 21:41:19.476Z",
    "name": "available_fastering_full",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "899f5ce5",
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
        "id": "1lvubed2",
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
        "id": "5bsezeog",
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
      "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_fastening as is_available,\n    (CASE\n      WHEN NOT ot.has_fastening THEN concat(\" - недоступно для типо печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n)\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k83ym09g9l9r0pe");

  return dao.deleteCollection(collection);
})
