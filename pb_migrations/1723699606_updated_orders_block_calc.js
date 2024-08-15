/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t")

  collection.options = {
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_sheet_height,\n  block_num_of_sheets_cut_screw_up,\n  block_rounded_num_of_sheets_cut_screw_up,\n  block_ofset_forms,\n  block_risograph_master_films,\n  block_printer_outgo_multiplier\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity)*1.0 as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*1.0 as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_column_height,\n\n    -- Высота листа\n    round(oec.estimated_circulation*bpp.thickness, 2)*1.0 as block_sheet_height,\n\n    -- Количество разных листов в привёртке резки\n    round(100.0/(oec.estimated_circulation*bpp.thickness), 2)*1.0 as block_num_of_sheets_cut_screw_up,\n\n    -- Количество разных листов в привёртке резки, округлённое\n    (CASE\n      WHEN 100.0/(oec.estimated_circulation*bpp.thickness) <= 1.0 THEN 1\n      ELSE floor(100.0/(oec.estimated_circulation*bpp.thickness))\n    END) as block_rounded_num_of_sheets_cut_screw_up,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_ofset_forms,\n\n    -- Количество мастер плёнок\n    (CASE\n      WHEN bp.is_risograph THEN ceiling((bc.risograph_master_films*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_risograph_master_films,\n\n    -- Множитель расхода краски блока\n    (CASE\n      WHEN bc.is_color THEN 0.75\n      ELSE 1.0\n    END) as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_sheet_height,\n    NULL as block_num_of_sheets_cut_screw_up,\n    NULL as block_rounded_num_of_sheets_cut_screw_up,\n    NULL as block_ofset_forms,\n    NULL as block_risograph_master_films,\n    NULL as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1apyxbvu",
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
    "id": "b7gimlas",
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
    "id": "p9jfe5oc",
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
    "id": "lcae4bfr",
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
    "id": "gajzdtfg",
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
    "id": "ceikdubk",
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
    "id": "62omorv0",
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
    "id": "ngcf0sxb",
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
    "id": "gutcqohx",
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
    "id": "earos19p",
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
    "id": "2p8ygxxb",
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
    "id": "pxelqkgs",
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
    "query": "SELECT\n  id,\n  block_sheets,\n  block_print_sheets,\n  block_full_sheets,\n  block_print_full_sheets,\n  block_product_column_height,\n  block_column_height,\n  block_sheet_height,\n  block_num_of_sheets_cut_screw_up,\n  block_rounded_num_of_sheets_cut_screw_up,\n  block_ofset_forms,\n  block_risograph_master_films,\n  block_printer_outgo_multiplier\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество листов, требуемых на блок\n    ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_sheets,\n\n    -- Количество сторон печати, требуемых на блок\n    ceiling(o.page_num/obp.block_multiplicity)*1.0 as block_print_sheets,\n\n    -- Всего листов на блок\n    ceiling(oec.estimated_circulation*o.page_num/(obp.block_multiplicity*bc.print_side_num))*1.0 as block_full_sheets,\n\n    -- Всего сторон печати, требуемых на блок\n    ceiling(oec.estimated_circulation*o.page_num/obp.block_multiplicity)*1.0 as block_print_full_sheets,\n\n    -- Высота столбца продукции блока\n    round(ceiling(oec.estimated_circulation*o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_product_column_height,\n\n    -- Высота блока\n    round(ceiling(o.page_num/bc.print_side_num)*bpp.thickness, 2)*1.0 as block_column_height,\n\n    -- Высота листа\n    round(oec.estimated_circulation*bpp.thickness, 2)*1.0 as block_sheet_height,\n\n    -- Количество разных листов в привёртке резки\n    round(100.0/oec.estimated_circulation*bpp.thickness, 2)*1.0 as block_num_of_sheets_cut_screw_up,\n\n    -- Количество разных листов в привёртке резки, округлённое\n    (CASE\n      WHEN 100.0/oec.estimated_circulation*bpp.thickness <= 1.0 THEN 1\n      ELSE floor(100.0/oec.estimated_circulation*bpp.thickness)\n    END) as block_rounded_num_of_sheets_cut_screw_up,\n\n    -- Количество форм офсета на блок\n    (CASE\n      WHEN bp.is_ofset THEN ceiling((bc.ofset_from_num*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_ofset_forms,\n\n    -- Количество мастер плёнок\n    (CASE\n      WHEN bp.is_risograph THEN ceiling((bc.risograph_master_films*o.page_num*1.05)/(obp.block_multiplicity*bc.print_side_num))*1.0\n      ELSE NULL\n    END) as block_risograph_master_films,\n\n    -- Множитель расхода краски блока\n    (CASE\n      WHEN bc.is_color THEN 0.75\n      ELSE 1.0\n    END) as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_block_processed obp,\n      colors bc,\n      printers bp,\n      papers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   obp.id = o.id\n  AND   bc.id = o.block_color\n  AND   bp.id = o.block_printer\n  AND   bpp.id = o.block_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_sheets,\n    NULL as block_print_sheets,\n    NULL as block_full_sheets,\n    NULL as block_print_full_sheets,\n    NULL as block_product_column_height,\n    NULL as block_column_height,\n    NULL as block_sheet_height,\n    NULL as block_num_of_sheets_cut_screw_up,\n    NULL as block_rounded_num_of_sheets_cut_screw_up,\n    NULL as block_ofset_forms,\n    NULL as block_risograph_master_films,\n    NULL as block_printer_outgo_multiplier\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

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

  // remove
  collection.schema.removeField("1apyxbvu")

  // remove
  collection.schema.removeField("b7gimlas")

  // remove
  collection.schema.removeField("p9jfe5oc")

  // remove
  collection.schema.removeField("lcae4bfr")

  // remove
  collection.schema.removeField("gajzdtfg")

  // remove
  collection.schema.removeField("ceikdubk")

  // remove
  collection.schema.removeField("62omorv0")

  // remove
  collection.schema.removeField("ngcf0sxb")

  // remove
  collection.schema.removeField("gutcqohx")

  // remove
  collection.schema.removeField("earos19p")

  // remove
  collection.schema.removeField("2p8ygxxb")

  // remove
  collection.schema.removeField("pxelqkgs")

  return dao.saveCollection(collection)
})
