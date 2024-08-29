/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc2oqtde3xud0pp")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Картридж цифра голубой\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_cyan_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      concat('Картридж ', p.name, ': Голубой') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра пурпурный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_magenta_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      121 as \"order\",\n      concat('Картридж ', p.name, ': Пурпурный') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра жёлтый\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_yellow_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      122 as \"order\",\n      concat('Картридж ', p.name, ': Жёлтый') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра чёрный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN NOT bc.is_color THEN obc.block_print_full_sheets/bp.outgo\n          ELSE obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      123 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Краска ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/bp.outgo as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      123 as \"order\",\n      concat('Краска ', p.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'л' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n)"
  }

  // remove
  collection.schema.removeField("ybunqn3w")

  // remove
  collection.schema.removeField("y21mu14q")

  // remove
  collection.schema.removeField("lzziwu0x")

  // remove
  collection.schema.removeField("pf6ugjyq")

  // remove
  collection.schema.removeField("d4tibudw")

  // remove
  collection.schema.removeField("jlujlt8h")

  // remove
  collection.schema.removeField("y1pl3rho")

  // remove
  collection.schema.removeField("i19j3bbc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dcvu1v3q",
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
    "id": "fzre84a7",
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
    "id": "npkzmagy",
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
    "id": "fmvghbvz",
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
    "id": "ucx3zbrf",
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
    "id": "esciul2f",
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
    "id": "gmn10bxp",
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
    "id": "oulghvdu",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Картридж цифра голубой\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_cyan_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      concat('Картридж ', p.name, ': Голубой') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра пурпурный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_magenta_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      121 as \"order\",\n      concat('Картридж ', p.name, ': Пурпурный') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра жёлтый\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_yellow_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      122 as \"order\",\n      concat('Картридж ', p.name, ': Жёлтый') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра чёрный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN NOT bc.is_color THEN obc.block_print_full_sheets/bp.outgo\n          ELSE obc.block_print_full_sheets/(bp.outgo*obc.block_printer_outgo_multiplier)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      123 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      round(calc.\"value\"*100, 1) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Краска ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_print_full_sheets/bp.outgo as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      123 as \"order\",\n      concat('Краска ', p.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'л' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ybunqn3w",
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
    "id": "y21mu14q",
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
    "id": "lzziwu0x",
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
    "id": "pf6ugjyq",
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
    "id": "d4tibudw",
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
    "id": "jlujlt8h",
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
    "id": "y1pl3rho",
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
    "id": "i19j3bbc",
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
  collection.schema.removeField("dcvu1v3q")

  // remove
  collection.schema.removeField("fzre84a7")

  // remove
  collection.schema.removeField("npkzmagy")

  // remove
  collection.schema.removeField("fmvghbvz")

  // remove
  collection.schema.removeField("ucx3zbrf")

  // remove
  collection.schema.removeField("esciul2f")

  // remove
  collection.schema.removeField("gmn10bxp")

  // remove
  collection.schema.removeField("oulghvdu")

  return dao.saveCollection(collection)
})
