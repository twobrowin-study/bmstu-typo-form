/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "x6qj2aggw38hgbr",
    "created": "2024-08-01 02:51:26.846Z",
    "updated": "2024-08-01 02:51:26.846Z",
    "name": "report_fields_materials_sheets_production",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5whrcj7u",
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
        "id": "asa3ea9o",
        "name": "section_id",
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
        "id": "a8s7tura",
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
        "id": "ihiv6xzd",
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
        "id": "pmove6gp",
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
        "id": "y0osepio",
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
        "id": "w3wwrbn3",
        "name": "rate",
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
        "id": "vj9nxycd",
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
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    SELECT\n      concat(o.id, '_paper') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      200 as \"order\",\n      concat(cp.name, ' ', ocp.cover_format) as \"name\",\n      occ.cover_sheets as \"value\",\n      'шт.' as units,\n      NULL as rate,\n      NULL as cost\n    FROM orders o,\n         orders_cover_processed ocp,\n         orders_cover_calc occ,\n         papers cp\n    WHERE ocp.id = o.id\n    AND   occ.id = o.id\n    AND   cp.id = o.cover_paper\n  )\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x6qj2aggw38hgbr");

  return dao.deleteCollection(collection);
})
