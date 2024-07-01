/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dc2mmgm2fo43fdc",
    "created": "2024-06-30 21:53:43.109Z",
    "updated": "2024-06-30 21:53:43.109Z",
    "name": "available_cover_lamination",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ehfcdymr",
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
        "id": "evmabgga",
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
      "query": "SELECT\n  id,\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_color = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    c.is_cover_lamination_available as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.id = o.cover_color\n)\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc");

  return dao.deleteCollection(collection);
})
