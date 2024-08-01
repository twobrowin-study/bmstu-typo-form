/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_ofset_forms,\n  risograph_master_films\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity) as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num*bc.print_side_num/obp.block_multiplicity) as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity) as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num*bc.print_side_num/obp.block_multiplicity) as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*bpp.thickness, 2) as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/obp.block_multiplicity)*bpp.thickness, 2) as block_column_height,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))\n      ELSE NULL\n    END) as block_ofset_forms,\n\n    -- Количество мастер плёнок\n    (CASE\n      WHEN bp.is_risograph THEN ceiling((bc.risograph_master_films*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))\n      ELSE NULL\n    END) as risograph_master_films\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_ofset_forms,\n    NULL as risograph_master_films\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // remove
  collection.schema.removeField("5equbey8")

  // remove
  collection.schema.removeField("ma0ftupt")

  // remove
  collection.schema.removeField("xhv7rs1r")

  // remove
  collection.schema.removeField("1vobhqlu")

  // remove
  collection.schema.removeField("ashn04kt")

  // remove
  collection.schema.removeField("h2w1bmkt")

  // remove
  collection.schema.removeField("u7582n8u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lnruzxkv",
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
    "id": "d0yftwn4",
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
    "id": "hyyumg2i",
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
    "id": "kys9cxnq",
    "name": "block_print_full_sheets",
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
    "id": "icvzdkup",
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
    "id": "ww47ug42",
    "name": "block_column_height",
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
    "id": "xae3pgak",
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
    "id": "6ueio7xe",
    "name": "risograph_master_films",
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
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_ofset_forms\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity) as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num*bc.print_side_num/obp.block_multiplicity) as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity) as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num*bc.print_side_num/obp.block_multiplicity) as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*bpp.thickness, 2) as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/obp.block_multiplicity)*bpp.thickness, 2) as block_column_height,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))\n      ELSE NULL\n    END) as block_ofset_forms\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_ofset_forms\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5equbey8",
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
    "id": "ma0ftupt",
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
    "id": "xhv7rs1r",
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
    "id": "1vobhqlu",
    "name": "block_print_full_sheets",
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
    "id": "ashn04kt",
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
    "id": "h2w1bmkt",
    "name": "block_column_height",
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
    "id": "u7582n8u",
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
  collection.schema.removeField("lnruzxkv")

  // remove
  collection.schema.removeField("d0yftwn4")

  // remove
  collection.schema.removeField("hyyumg2i")

  // remove
  collection.schema.removeField("kys9cxnq")

  // remove
  collection.schema.removeField("icvzdkup")

  // remove
  collection.schema.removeField("ww47ug42")

  // remove
  collection.schema.removeField("xae3pgak")

  // remove
  collection.schema.removeField("6ueio7xe")

  return dao.saveCollection(collection)
})
