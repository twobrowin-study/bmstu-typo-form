/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "eu67aksjxory34z",
    "created": "2024-08-15 08:44:12.583Z",
    "updated": "2024-08-15 08:44:12.583Z",
    "name": "report_fields_full_sums",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mnpcqcgu",
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
        "id": "yz2mdkti",
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
        "id": "o9oxqv4z",
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
        "id": "jaguxumm",
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
        "id": "vmrgwfhn",
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
        "id": "jpj0y7bs",
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
        "id": "g3appdja",
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
        "id": "jwsqpkdp",
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
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    400 as \"order\",\n    'Общая стоимость' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    rms.cost + rws.cost*7 as cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms,\n       report_works_sum rws\n  WHERE rms.order_id = o.id\n  AND   rws.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(((rms.cost + rws.cost*7)*1.0)/oec.estimated_circulation) as cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms,\n       report_works_sum rws,\n       orders_estimated_circulation oec\n  WHERE rms.order_id = o.id\n  AND   rws.order_id = o.id\n  AND   oec.id = o.id\n  AND   ot.id = o.type\n)\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eu67aksjxory34z");

  return dao.deleteCollection(collection);
})
