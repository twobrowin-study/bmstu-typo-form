/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wm1axh9lep4pro4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "wm1axh9lep4pro4",
    "created": "2024-06-17 14:02:32.407Z",
    "updated": "2024-07-28 14:04:15.065Z",
    "name": "old_report_fields",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "irb7rxxn",
        "name": "section",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Заказ",
            "Выходные форматы",
            "Материалы",
            "Работы"
          ]
        }
      },
      {
        "system": false,
        "id": "cwgvzdcv",
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
        "id": "xcueahew",
        "name": "name",
        "type": "text",
        "required": true,
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
        "id": "bbhbe3dm",
        "name": "key",
        "type": "text",
        "required": true,
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
        "id": "6r3yxckb",
        "name": "units",
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
        "id": "xrtrvqrd",
        "name": "is_name_value_pair",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "4mz4aidu",
        "name": "is_datetime",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "t9w1wy1u",
        "name": "is_boolean",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
