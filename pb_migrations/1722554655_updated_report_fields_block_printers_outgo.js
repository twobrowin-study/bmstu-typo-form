/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc2oqtde3xud0pp")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Картридж цифра голубой\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_cyan_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      concat('Картридж ', p.name, ': Голубой') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра пурпурный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_magenta_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      121 as \"order\",\n      concat('Картридж ', p.name, ': Пурпурный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра жёлтый\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_yellow_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      122 as \"order\",\n      concat('Картридж ', p.name, ': Жёлтый') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра чёрный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN NOT bc.is_color THEN obc.block_print_full_sheets/bp.outgo\n          ELSE obc.block_print_full_sheets/(bp.outgo*1.15)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      123 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Краска ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/bp.outgo as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      123 as \"order\",\n      concat('Краска ', p.name) as \"name\",\n      round(calc.\"value\", 4) as \"value\",\n      'л' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n)"
  }

  // remove
  collection.schema.removeField("3bbpgdcr")

  // remove
  collection.schema.removeField("qft0i3np")

  // remove
  collection.schema.removeField("pntddhbq")

  // remove
  collection.schema.removeField("c764rwyb")

  // remove
  collection.schema.removeField("wjbavuss")

  // remove
  collection.schema.removeField("bby61x5c")

  // remove
  collection.schema.removeField("ax3owkvl")

  // remove
  collection.schema.removeField("fzs4hn6a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ue7x8qj",
    "name": "order_id",
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
    "id": "cd4zzwpm",
    "name": "section_id",
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
    "id": "4c9latf3",
    "name": "order",
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
    "id": "jifnq4we",
    "name": "name",
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
    "id": "zb1jxykv",
    "name": "value",
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
    "id": "fn676i1r",
    "name": "units",
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
    "id": "yjxr4tyg",
    "name": "rate",
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
    "id": "wtc7nlgh",
    "name": "cost",
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
  const collection = dao.findCollectionByNameOrId("nc2oqtde3xud0pp")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Картридж цифра голубой\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_cyan_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101 as \"order\",\n      concat('Картридж ', p.name, ': Голубой') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра пурпурный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_magenta_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Картридж ', p.name, ': Пурпурный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра жёлтый\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_yellow_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      103 as \"order\",\n      concat('Картридж ', p.name, ': Жёлтый') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра чёрный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN NOT bc.is_color THEN obc.block_print_full_sheets/bp.outgo\n          ELSE obc.block_print_full_sheets/(bp.outgo*1.15)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      104 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Краска ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/bp.outgo as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      104 as \"order\",\n      concat('Краска ', p.name) as \"name\",\n      round(calc.\"value\", 4) as \"value\",\n      'л' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3bbpgdcr",
    "name": "order_id",
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
    "id": "qft0i3np",
    "name": "section_id",
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
    "id": "pntddhbq",
    "name": "order",
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
    "id": "c764rwyb",
    "name": "name",
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
    "id": "wjbavuss",
    "name": "value",
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
    "id": "bby61x5c",
    "name": "units",
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
    "id": "ax3owkvl",
    "name": "rate",
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
    "id": "fzs4hn6a",
    "name": "cost",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("1ue7x8qj")

  // remove
  collection.schema.removeField("cd4zzwpm")

  // remove
  collection.schema.removeField("4c9latf3")

  // remove
  collection.schema.removeField("jifnq4we")

  // remove
  collection.schema.removeField("zb1jxykv")

  // remove
  collection.schema.removeField("fn676i1r")

  // remove
  collection.schema.removeField("yjxr4tyg")

  // remove
  collection.schema.removeField("wtc7nlgh")

  return dao.saveCollection(collection)
})