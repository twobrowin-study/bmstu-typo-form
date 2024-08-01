/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k5010kxgwhut1jq")

  collection.options = {
    "query": "-- Метталическая пружина\nSELECT\n    o.id as id,\n    sfr.spring_diameter as spring_diameter\nFROM orders o,\n    order_types ot,\n    fastenings f,\n    orders_block_calc as obc,\n    spring_fastenings_rules sfr\nWHERE ot.id = o.type\nAND   ot.has_block\nAND   f.id = o.fastening\nAND   f.is_metal_spring\nAND   obc.block_column_height >= sfr.block_product_column_height\nORDER BY sfr.block_product_column_height DESC\nLIMIT 1"
  }

  // remove
  collection.schema.removeField("gwiynwqu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wiusqwtu",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k5010kxgwhut1jq")

  collection.options = {
    "query": "    -- Метталическая пружина\n    SELECT\n        o.id as id,\n        sfr.spring_diameter as spring_diameter\n    FROM orders o,\n        order_types ot,\n        fastenings f,\n        orders_block_calc as obc,\n        spring_fastenings_rules sfr\n    WHERE ot.id = o.type\n    AND   ot.has_block\n    AND   f.id = o.fastening\n    AND   f.is_metal_spring\n    AND   obc.block_product_column_height >= sfr.block_product_column_height\n    ORDER BY sfr.block_product_column_height DESC\n    LIMIT 1"
  }

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("wiusqwtu")

  return dao.saveCollection(collection)
})
