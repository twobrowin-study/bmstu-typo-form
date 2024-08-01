/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_product_column_height,\n  block_ofset_forms\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity) as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num*bc.print_side_num/obp.block_multiplicity) as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity) as block_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*bpp.thickness, 2) as block_product_column_height,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling(bc.ofset_from_num*1.05*o.page_num/obp.block_multiplicity)\n      ELSE NULL\n    END) as block_ofset_forms\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_ofset_forms\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // remove
  collection.schema.removeField("kl2wgu2x")

  // remove
  collection.schema.removeField("hu2ous2g")

  // remove
  collection.schema.removeField("yugvhnmu")

  // remove
  collection.schema.removeField("qmc1uem0")

  // remove
  collection.schema.removeField("nfc2nzev")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjn76dar",
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
    "id": "8rfpzngu",
    "name": "block_print_sheets",
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
    "id": "azedpf6m",
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
    "id": "go1koxmz",
    "name": "block_product_column_height",
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
    "id": "wikvbbit",
    "name": "block_ofset_forms",
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
    "query": "SELECT\n  id,\n  block_sides,\n  block_sheets,\n  block_full_sheets,\n  block_product_column_height,\n  block_ofset_forms\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity) as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num*bc.print_side_num/obp.block_multiplicity) as block_sides,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity) as block_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*bpp.thickness, 2) as block_product_column_height,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling(bc.ofset_from_num*1.05*o.page_num/obp.block_multiplicity)\n      ELSE NULL\n    END) as block_ofset_forms\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sides,\n    NULL as block_sheets,\n    NULL as block_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_ofset_forms\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kl2wgu2x",
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
    "id": "hu2ous2g",
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
    "id": "yugvhnmu",
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
    "id": "qmc1uem0",
    "name": "block_product_column_height",
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
    "id": "nfc2nzev",
    "name": "block_ofset_forms",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("fjn76dar")

  // remove
  collection.schema.removeField("8rfpzngu")

  // remove
  collection.schema.removeField("azedpf6m")

  // remove
  collection.schema.removeField("go1koxmz")

  // remove
  collection.schema.removeField("wikvbbit")

  return dao.saveCollection(collection)
})
