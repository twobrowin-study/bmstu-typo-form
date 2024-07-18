/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jw0qgba656xmigh",
    "created": "2024-07-16 22:07:29.310Z",
    "updated": "2024-07-16 22:07:29.310Z",
    "name": "reports",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "80gujnyo",
        "name": "section",
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
        "id": "68mfunz9",
        "name": "order",
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
        "id": "rhsy91p1",
        "name": "name",
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
        "id": "xuxs6tnu",
        "name": "value",
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
        "id": "w97hytnu",
        "name": "units",
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
        "id": "2zeumqls",
        "name": "rate",
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
        "id": "hui8h26i",
        "name": "cost",
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
      "query": "SELECT\n  concat(o.id, '_file_prepare') as id,\n  'Работы' as section,\n  10 as \"order\",\n  'Подгтовка файлов' as \"name\",\n  round((21+o.circulation*0.0012)/60, 2) as \"value\",\n  'н/ч' as units,\n  dg.price as rate,\n  round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\nFROM orders o,\n     difficulty_groups as dg\nWHERE dg.name = 1"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh");

  return dao.deleteCollection(collection);
})
