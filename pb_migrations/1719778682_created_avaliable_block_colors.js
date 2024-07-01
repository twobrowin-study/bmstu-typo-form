/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "oe3ikqzqo5bub36",
    "created": "2024-06-30 20:18:02.537Z",
    "updated": "2024-06-30 20:18:02.537Z",
    "name": "avaliable_block_colors",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "c9oybeoz",
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
        "id": "1ze1ihkl",
        "name": "format_id",
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
        "id": "tlsniijp",
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
        "id": "64lwexfn",
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
        "id": "x7jltv6m",
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
        "id": "j73o0r4i",
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
      "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.is_block_avaliable\n  AND   o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_block_avaliable\n  AND   pr.id = o.block_printer\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("oe3ikqzqo5bub36");

  return dao.deleteCollection(collection);
})
