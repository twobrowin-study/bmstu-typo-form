/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "e8sx7g50waw7ibn",
    "created": "2024-08-01 16:15:34.393Z",
    "updated": "2024-08-01 16:15:34.393Z",
    "name": "report_fields_paper_brochure",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "iuuye9q2",
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
        "id": "8spmy4pw",
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
        "id": "wby02ash",
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
        "id": "gf7cfzet",
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
        "id": "38raqmlz",
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
        "id": "kxj1tbva",
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
        "id": "xvng7rrg",
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
        "id": "6cg6rfi2",
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
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e8sx7g50waw7ibn");

  return dao.deleteCollection(collection);
})
