/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "v047evpkz5bi2zn",
    "created": "2024-06-12 14:14:31.971Z",
    "updated": "2024-06-12 14:14:31.971Z",
    "name": "cover_formats",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cngyqmzd",
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
        "id": "nimok5vg",
        "name": "multiplicity",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "kpfeomsd",
        "name": "fastening_rule",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 6,
          "values": [
            "Cкоба",
            "Полиуретан",
            "Термоклей",
            "Пружина пластиковая",
            "Пружина металлическая",
            "Cбоку на скобы"
          ]
        }
      },
      {
        "system": false,
        "id": "6fzbcxhe",
        "name": "format_w_departure_elements",
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
        "id": "o4dwh6xp",
        "name": "format_wo_departure_elements",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("v047evpkz5bi2zn");

  return dao.deleteCollection(collection);
})
