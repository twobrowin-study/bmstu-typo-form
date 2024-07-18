/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  ceiling(o.page_num/obp.block_multiplicity) as block_sides,\n  ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num)) as block_sheets,\n  ceiling((oec.estimated_circulation*o.page_num)/(obp.block_multiplicity*bc.print_side_num)) as block_full_sheets,\n  (CASE\n    WHEN bp.is_ofset THEN ceiling((o.page_num*bc.ofset_from_num*1.05)/(obp.block_multiplicity*bc.print_side_num))\n    ELSE NULL\n  END) as block_ofset_forms,\n  ceiling((oec.estimated_circulation*o.page_num*bpp.thickness)/(obp.block_multiplicity)) as block_product_column_height\nFROM orders o,\n     order_types ot,\n     orders_estimated_circulation oec,\n     orders_block_processed obp,\n     colors bc,\n     printers bp,\n     papers bpp\nWHERE ot.id = o.type\nAND   ot.has_block\nAND   oec.id = o.id\nAND   obp.id = o.id\nAND   bc.id = o.block_color\nAND   bp.id = o.block_printer\nAND   bpp.id = o.block_paper"
  }

  // remove
  collection.schema.removeField("zvnhsz4y")

  // remove
  collection.schema.removeField("eegr9x23")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vz0vbccx",
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
    "id": "8ic7rk7r",
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
    "id": "nzs0patj",
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
    "id": "vwizn55c",
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
    "id": "vl6d8ts9",
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
    "query": "SELECT\n  o.id as id,\n  ceiling(o.page_num/obp.block_multiplicity) as block_sides,\n  ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num)) as block_sheets\nFROM orders o,\n     orders_estimated_circulation oec,\n     orders_block_processed obp,\n     colors bc\nWHERE oec.id = o.id\nAND   obp.id = o.id\nAND   bc.id = o.block_color"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zvnhsz4y",
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
    "id": "eegr9x23",
    "name": "block_sheets",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("vz0vbccx")

  // remove
  collection.schema.removeField("8ic7rk7r")

  // remove
  collection.schema.removeField("nzs0patj")

  // remove
  collection.schema.removeField("vwizn55c")

  // remove
  collection.schema.removeField("vl6d8ts9")

  return dao.saveCollection(collection)
})
