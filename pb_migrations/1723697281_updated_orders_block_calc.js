/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_ofset_forms,\n  block_risograph_master_films,\n  block_printer_outgo_multiplier\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity)*1.0 as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*1.0 as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_column_height,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_ofset_forms,\n\n    -- Количество мастер плёнок\n    (CASE\n      WHEN bp.is_risograph THEN ceiling((bc.risograph_master_films*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_risograph_master_films,\n\n    -- Множитель расхода краски блока\n    (CASE\n      WHEN bc.is_color THEN 0.75\n      ELSE 1.0\n    END) as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_ofset_forms,\n    NULL as block_risograph_master_films,\n    NULL as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // remove
  collection.schema.removeField("ul7fggl4")

  // remove
  collection.schema.removeField("65dyakfk")

  // remove
  collection.schema.removeField("dtreyq3e")

  // remove
  collection.schema.removeField("gmdpjyq1")

  // remove
  collection.schema.removeField("rnadqc58")

  // remove
  collection.schema.removeField("ncjxc14b")

  // remove
  collection.schema.removeField("jxjfwta6")

  // remove
  collection.schema.removeField("t3plzvwp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "omjpm5gj",
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
    "id": "brkfhp8l",
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
    "id": "lzezuhod",
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
    "id": "3d9qku6z",
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
    "id": "h7jrflrg",
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
    "id": "naadhwg2",
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
    "id": "7e4b6scz",
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
    "id": "na5ptqkg",
    "name": "block_risograph_master_films",
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
    "id": "ttpnfqtp",
    "name": "block_printer_outgo_multiplier",
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
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_ofset_forms,\n  block_risograph_master_films\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity)*1.0 as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*1.0 as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_column_height,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_ofset_forms,\n\n    -- Количество мастер плёнок\n    (CASE\n      WHEN bp.is_risograph THEN ceiling((bc.risograph_master_films*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_risograph_master_films\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_ofset_forms,\n    NULL as block_risograph_master_films\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ul7fggl4",
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
    "id": "65dyakfk",
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
    "id": "dtreyq3e",
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
    "id": "gmdpjyq1",
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
    "id": "rnadqc58",
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
    "id": "ncjxc14b",
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
    "id": "jxjfwta6",
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
    "id": "t3plzvwp",
    "name": "block_risograph_master_films",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("omjpm5gj")

  // remove
  collection.schema.removeField("brkfhp8l")

  // remove
  collection.schema.removeField("lzezuhod")

  // remove
  collection.schema.removeField("3d9qku6z")

  // remove
  collection.schema.removeField("h7jrflrg")

  // remove
  collection.schema.removeField("naadhwg2")

  // remove
  collection.schema.removeField("7e4b6scz")

  // remove
  collection.schema.removeField("na5ptqkg")

  // remove
  collection.schema.removeField("ttpnfqtp")

  return dao.saveCollection(collection)
})
