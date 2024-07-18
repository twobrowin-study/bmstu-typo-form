/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  id,\n  block_sides,\n  block_sheets,\n  block_full_sheets,\n  block_ofset_forms,\n  block_product_column_height\nFROM (\n  SELECT\n    o.id as id,\n    ceiling(o.page_num/obp.block_multiplicity) as block_sides,\n    ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num)) as block_sheets,\n    ceiling((oec.estimated_circulation*o.page_num)/(obp.block_multiplicity*bc.print_side_num)) as block_full_sheets,\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((o.page_num*bc.ofset_from_num*1.05)/(obp.block_multiplicity*bc.print_side_num))\n      ELSE NULL\n    END) as block_ofset_forms,\n    ceiling((oec.estimated_circulation*o.page_num)/(obp.block_multiplicity))*bpp.thickness as block_product_column_height\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sides,\n    NULL as block_sheets,\n    NULL as block_full_sheets,\n    NULL as block_ofset_forms,\n    NULL as block_product_column_height\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // remove
  collection.schema.removeField("juu0ucbp")

  // remove
  collection.schema.removeField("li4ysxww")

  // remove
  collection.schema.removeField("zdlhgwhi")

  // remove
  collection.schema.removeField("bgxoiuup")

  // remove
  collection.schema.removeField("pnm8blty")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rcvaplja",
    "name": "block_sides",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wazs7y4o",
    "name": "block_sheets",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eoygu2v7",
    "name": "block_full_sheets",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "airc8fuq",
    "name": "block_ofset_forms",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c0bsbm1j",
    "name": "block_product_column_height",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  ceiling(o.page_num/obp.block_multiplicity) as block_sides,\n  ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num)) as block_sheets,\n  ceiling((oec.estimated_circulation*o.page_num)/(obp.block_multiplicity*bc.print_side_num)) as block_full_sheets,\n  (CASE\n    WHEN bp.is_ofset THEN ceiling((o.page_num*bc.ofset_from_num*1.05)/(obp.block_multiplicity*bc.print_side_num))\n    ELSE NULL\n  END) as block_ofset_forms,\n  ceiling((oec.estimated_circulation*o.page_num)/(obp.block_multiplicity))*bpp.thickness as block_product_column_height\nFROM orders o,\n     order_types ot,\n     orders_estimated_circulation oec,\n     orders_block_processed obp,\n     colors bc,\n     printers bp,\n     papers bpp\nWHERE ot.id = o.type\nAND   ot.has_block\nAND   oec.id = o.id\nAND   obp.id = o.id\nAND   bc.id = o.block_color\nAND   bp.id = o.block_printer\nAND   bpp.id = o.block_paper"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "juu0ucbp",
    "name": "block_sides",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "li4ysxww",
    "name": "block_sheets",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zdlhgwhi",
    "name": "block_full_sheets",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgxoiuup",
    "name": "block_ofset_forms",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pnm8blty",
    "name": "block_product_column_height",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("rcvaplja")

  // remove
  collection.schema.removeField("wazs7y4o")

  // remove
  collection.schema.removeField("eoygu2v7")

  // remove
  collection.schema.removeField("airc8fuq")

  // remove
  collection.schema.removeField("c0bsbm1j")

  return dao.saveCollection(collection)
})
