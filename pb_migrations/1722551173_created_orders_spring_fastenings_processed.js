/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "k5010kxgwhut1jq",
    "created": "2024-08-01 22:26:13.134Z",
    "updated": "2024-08-01 22:26:13.134Z",
    "name": "orders_spring_fastenings_processed",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gwiynwqu",
        "name": "spring_diameter",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
      "query": "    -- Метталическая пружина\n    SELECT\n        o.id as id,\n        sfr.spring_diameter as spring_diameter\n    FROM orders o,\n        order_types ot,\n        fastenings f,\n        orders_block_calc as obc,\n        spring_fastenings_rules sfr\n    WHERE ot.id = o.type\n    AND   ot.has_block\n    AND   f.id = o.fastening\n    AND   f.is_metal_spring\n    AND   obc.block_product_column_height >= sfr.block_product_column_height\n    ORDER BY sfr.block_product_column_height DESC\n    LIMIT 1"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k5010kxgwhut1jq");

  return dao.deleteCollection(collection);
})
