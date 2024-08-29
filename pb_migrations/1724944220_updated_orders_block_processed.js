/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ya18r70h1809giq")

  collection.options = {
    "query": "SELECT\n  id,\n\n  -- Количество страниц на лист\n  block_multiplicity,\n\n  -- Формат используемого листа\n  block_format,\n\n  -- Цена за бумагу блока\n  block_paper_price,\n\n  -- Время резки\n  cut_time\n\nFROM (\n  \n  -- У изделия есть блок\n  SELECT\n    o.id as id,\n    bfr.multiplicity*1.0 as block_multiplicity,\n    (CASE\n      WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n      ELSE bfr.format_wo_departure_elements\n    END) as block_format,\n    pp.price as block_paper_price,\n    (CASE\n      WHEN f.is_brace THEN ctr.cut_time_brace\n      ELSE ctr.cut_time_not_brace\n    END) as cut_time\n  FROM orders o,\n      order_types ot,\n      block_format_rules bfr,\n      json_each(bfr.format) as bfr_format,\n      json_each(bfr.printer) as bfr_printer,\n      paper_prices pp,\n      cut_time_rules ctr,\n      json_each(ctr.printer) as ctr_printer,\n      fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bfr_format.value = o.format\n  AND   bfr_printer.value = o.block_printer\n  AND   ctr.format = o.format\n  AND   ctr_printer.value = o.block_printer\n  AND   pp.paper = o.block_paper\n  AND   (\n    pp.format = bfr.format_w_departure_elements AND o.block_departure_elements\n    OR\n    pp.format = bfr.format_wo_departure_elements AND NOT o.block_departure_elements\n  )\n  AND (f.id = o.fastening OR ot.is_7bc AND f.is_hot_melt_adhesive)\n\n  UNION\n\n  -- У изделия нет блока\n  SELECT\n    o.id as id,\n    NULL as block_multiplicity,\n    NULL as block_format,\n    NULL as block_paper_price,\n    NULL as cut_time\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)\n"
  }

  // remove
  collection.schema.removeField("khcvmlth")

  // remove
  collection.schema.removeField("zvunxurb")

  // remove
  collection.schema.removeField("7kjkmvg1")

  // remove
  collection.schema.removeField("0pep9jlz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9vszn95a",
    "name": "block_multiplicity",
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
    "id": "3kuwmvfc",
    "name": "block_format",
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
    "id": "bsl5dksn",
    "name": "block_paper_price",
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
    "id": "n9kghmd2",
    "name": "cut_time",
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
  const collection = dao.findCollectionByNameOrId("ya18r70h1809giq")

  collection.options = {
    "query": "SELECT\n  id,\n\n  -- Количество страниц на лист\n  block_multiplicity,\n\n  -- Формат используемого листа\n  block_format,\n\n  -- Цена за бумагу блока\n  block_paper_price,\n\n  -- Время резки\n  cut_time\n\nFROM (\n  \n  -- У изделия есть блок\n  SELECT\n    o.id as id,\n    bfr.multiplicity*1.0 as block_multiplicity,\n    (CASE\n      WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n      ELSE bfr.format_wo_departure_elements\n    END) as block_format,\n    pp.price as block_paper_price,\n    (CASE\n      WHEN f.is_brace THEN ctr.cut_time_brace\n      ELSE ctr.cut_time_not_brace\n    END) as cut_time\n  FROM orders o,\n      order_types ot,\n      block_format_rules bfr,\n      json_each(bfr.format) as bfr_format,\n      json_each(bfr.printer) as bfr_printer,\n      paper_prices pp,\n      cut_time_rules ctr,\n      json_each(ctr.printer) as ctr_printer,\n      fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bfr_format.value = o.format\n  AND   bfr_printer.value = o.block_printer\n  AND   ctr.format = o.format\n  AND   ctr_printer.value = o.block_printer\n  AND   pp.paper = o.block_paper\n  AND   (\n    pp.format = bfr.format_w_departure_elements AND o.block_departure_elements\n    OR\n    pp.format = bfr.format_wo_departure_elements AND NOT o.block_departure_elements\n  )\n  AND f.id = o.fastening\n\n  UNION\n\n  -- У изделия нет блока\n  SELECT\n    o.id as id,\n    NULL as block_multiplicity,\n    NULL as block_format,\n    NULL as block_paper_price,\n    NULL as cut_time\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "khcvmlth",
    "name": "block_multiplicity",
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
    "id": "zvunxurb",
    "name": "block_format",
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
    "id": "7kjkmvg1",
    "name": "block_paper_price",
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
    "id": "0pep9jlz",
    "name": "cut_time",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("9vszn95a")

  // remove
  collection.schema.removeField("3kuwmvfc")

  // remove
  collection.schema.removeField("bsl5dksn")

  // remove
  collection.schema.removeField("n9kghmd2")

  return dao.saveCollection(collection)
})