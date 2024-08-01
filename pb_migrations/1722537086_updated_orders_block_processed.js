/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ya18r70h1809giq")

  collection.options = {
    "query": "SELECT\n  id,\n  block_multiplicity,\n  block_format,\n  block_paper_price\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество страниц на лист\n    bfr.multiplicity as block_multiplicity,\n\n    -- Формат используемого листа\n    (CASE\n      WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n      ELSE bfr.format_wo_departure_elements\n    END) as block_format,\n\n    -- Цена за бумагу блока\n    pp.price as block_paper_price\n\n    -- У изделия есть блок\n  FROM orders o,\n      order_types ot,\n      block_format_rules bfr,\n      json_each(bfr.format) as bfr_format,\n      json_each(bfr.printer) as bfr_printer,\n      paper_prices pp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bfr_format.value = o.format\n  AND   bfr_printer.value = o.block_printer\n  AND   pp.paper = o.block_paper\n  AND   (\n    pp.format = bfr.format_w_departure_elements AND o.block_departure_elements\n    OR\n    pp.format = bfr.format_wo_departure_elements AND NOT o.block_departure_elements\n  )\n\n  UNION\n\n  -- У изделия нет блока\n  SELECT\n    o.id as id,\n    NULL as block_multiplicity,\n    NULL as block_format,\n    NULL as block_paper_price\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)\n"
  }

  // remove
  collection.schema.removeField("91cr05pb")

  // remove
  collection.schema.removeField("chid5v25")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ab1xfycx",
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
    "id": "y2pdegtu",
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
    "id": "uirdoted",
    "name": "block_paper_price",
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
    "query": "SELECT\n  id,\n  block_multiplicity,\n  block_format\nFROM (\n  SELECT\n    o.id as id,\n\n    -- Количество страниц на лист\n    bfr.multiplicity as block_multiplicity,\n\n    -- Формат используемого листа\n    (CASE\n      WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n      ELSE bfr.format_wo_departure_elements\n    END) as block_format\n\n    -- У изделия есть блок\n  FROM orders o,\n      order_types ot,\n      block_format_rules bfr,\n      json_each(bfr.format) as bfr_format,\n      json_each(bfr.printer) as bfr_printer\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bfr_format.value = o.format\n  AND   bfr_printer.value = o.block_printer\n\n  UNION\n\n  -- У изделия нет блока\n  SELECT\n    o.id as id,\n    NULL as block_multiplicity,\n    NULL as block_format\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "91cr05pb",
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
    "id": "chid5v25",
    "name": "block_format",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("ab1xfycx")

  // remove
  collection.schema.removeField("y2pdegtu")

  // remove
  collection.schema.removeField("uirdoted")

  return dao.saveCollection(collection)
})
