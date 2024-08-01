/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9vazimmxsrkibfh",
    "created": "2024-08-01 21:09:01.508Z",
    "updated": "2024-08-01 21:09:01.508Z",
    "name": "report_fields_cover_paper_brochure",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kyllj7vs",
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
        "id": "04dhrs15",
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
        "id": "2gucohbo",
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
        "id": "glv86ddk",
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
        "id": "rippwgmv",
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
        "id": "m7og6rdy",
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
        "id": "xhvldbp3",
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
        "id": "mxfif3e7",
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
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(occ.cover_sheets*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format != '700*500'\n\n  UNION\n\n  -- Бумага на обложку 700*500\n  SELECT\n    concat(o.id, '_cover_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' 700*1000 обложка') as \"name\",\n    ceiling(occ.cover_sheets/2) as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(ceiling(occ.cover_sheets/2)*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format = '700*500'\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9vazimmxsrkibfh");

  return dao.deleteCollection(collection);
})
