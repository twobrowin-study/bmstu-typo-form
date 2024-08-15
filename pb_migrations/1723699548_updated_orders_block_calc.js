/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_sheet_height,\n  block_num_of_sheets_cut_screw_up,\n  block_rounded_num_of_sheets_cut_screw_up,\n  block_ofset_forms,\n  block_risograph_master_films,\n  block_printer_outgo_multiplier\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity)*1.0 as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*1.0 as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_column_height,\n\n    -- Высота листа\n    round(oec.estimated_circulation*bpp.thickness, 2)*1.0 as block_sheet_height,\n\n    -- Количество разных листов в привёртке резки\n    round(100.0/oec.estimated_circulation*bpp.thickness, 2)*1.0 as block_num_of_sheets_cut_screw_up,\n\n    -- Количество разных листов в привёртке резки, округлённое\n    (CASE\n      WHEN 100.0/oec.estimated_circulation*bpp.thickness <= 1.0 THEN 1\n      ELSE floor(100.0/oec.estimated_circulation*bpp.thickness)\n    END) as block_rounded_num_of_sheets_cut_screw_up,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_ofset_forms,\n\n    -- Количество мастер плёнок\n    (CASE\n      WHEN bp.is_risograph THEN ceiling((bc.risograph_master_films*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_risograph_master_films,\n\n    -- Множитель расхода краски блока\n    (CASE\n      WHEN bc.is_color THEN 0.75\n      ELSE 1.0\n    END) as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_sheet_height,\n    NULL as block_num_of_sheets_cut_screw_up,\n    NULL as block_rounded_num_of_sheets_cut_screw_up,\n    NULL as block_ofset_forms,\n    NULL as block_risograph_master_films,\n    NULL as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // remove
  collection.schema.removeField("kbrygmlv")

  // remove
  collection.schema.removeField("m7ehzyak")

  // remove
  collection.schema.removeField("crryzy2j")

  // remove
  collection.schema.removeField("epi2dtzz")

  // remove
  collection.schema.removeField("q14nezan")

  // remove
  collection.schema.removeField("s6ri5cv5")

  // remove
  collection.schema.removeField("pwiuhytr")

  // remove
  collection.schema.removeField("l56kni4c")

  // remove
  collection.schema.removeField("2zylluzk")

  // remove
  collection.schema.removeField("ulgnmvzq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fc6th05h",
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
    "id": "isej9z6n",
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
    "id": "qhd5of4v",
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
    "id": "ddas9wol",
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
    "id": "buq60k9f",
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
    "id": "ovjh2ie2",
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
    "id": "oyk3zlri",
    "name": "block_sheet_height",
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
    "id": "z75zyyhy",
    "name": "block_num_of_sheets_cut_screw_up",
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
    "id": "n5x6pbei",
    "name": "block_rounded_num_of_sheets_cut_screw_up",
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
    "id": "jq2temqx",
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
    "id": "ffivilru",
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
    "id": "l7fhmffj",
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
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_sheet_height,\n  block_ofset_forms,\n  block_risograph_master_films,\n  block_printer_outgo_multiplier\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity)*1.0 as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*1.0 as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_column_height,\n\n    -- Высота листа\n    round(oec.estimated_circulation*bpp.thickness, 2)*1.0 as block_sheet_height,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_ofset_forms,\n\n    -- Количество мастер плёнок\n    (CASE\n      WHEN bp.is_risograph THEN ceiling((bc.risograph_master_films*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_risograph_master_films,\n\n    -- Множитель расхода краски блока\n    (CASE\n      WHEN bc.is_color THEN 0.75\n      ELSE 1.0\n    END) as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_sheet_height,\n    NULL as block_ofset_forms,\n    NULL as block_risograph_master_films,\n    NULL as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kbrygmlv",
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
    "id": "m7ehzyak",
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
    "id": "crryzy2j",
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
    "id": "epi2dtzz",
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
    "id": "q14nezan",
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
    "id": "s6ri5cv5",
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
    "id": "pwiuhytr",
    "name": "block_sheet_height",
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
    "id": "l56kni4c",
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
    "id": "2zylluzk",
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
    "id": "ulgnmvzq",
    "name": "block_printer_outgo_multiplier",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("fc6th05h")

  // remove
  collection.schema.removeField("isej9z6n")

  // remove
  collection.schema.removeField("qhd5of4v")

  // remove
  collection.schema.removeField("ddas9wol")

  // remove
  collection.schema.removeField("buq60k9f")

  // remove
  collection.schema.removeField("ovjh2ie2")

  // remove
  collection.schema.removeField("oyk3zlri")

  // remove
  collection.schema.removeField("z75zyyhy")

  // remove
  collection.schema.removeField("n5x6pbei")

  // remove
  collection.schema.removeField("jq2temqx")

  // remove
  collection.schema.removeField("ffivilru")

  // remove
  collection.schema.removeField("l7fhmffj")

  return dao.saveCollection(collection)
})
