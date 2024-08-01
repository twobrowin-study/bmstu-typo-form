/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6qj2aggw38hgbr")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    SELECT\n      concat(o.id, '_paper') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      100 as \"order\",\n      concat(cp.name, ' ', ocp.cover_format) as \"name\",\n      occ.cover_sheets as \"value\",\n      'шт.' as units,\n      cp.price as rate,\n      round(occ.cover_sheets*cp.price, 1) as cost\n    FROM orders o,\n         orders_cover_processed ocp,\n         orders_cover_calc occ,\n         papers cp\n    WHERE ocp.id = o.id\n    AND   occ.id = o.id\n    AND   cp.id = o.cover_paper\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(occ.cover_sheets*cc.print_side_num/cp.outgo, 5) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_cyan') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101 as \"order\",\n      concat('Картридж ', p.name, ': Голубой') as \"name\",\n      calc.\"value\"*100 as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.cover_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(occ.cover_sheets*cc.print_side_num/cp.outgo, 5) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      104 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      calc.\"value\"*100 as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n)"
  }

  // remove
  collection.schema.removeField("3vabtkug")

  // remove
  collection.schema.removeField("x0efxn2x")

  // remove
  collection.schema.removeField("jqc7ofve")

  // remove
  collection.schema.removeField("5r7erdxs")

  // remove
  collection.schema.removeField("p7lywmbu")

  // remove
  collection.schema.removeField("to5bb9hg")

  // remove
  collection.schema.removeField("z3krrzvz")

  // remove
  collection.schema.removeField("fqwisyld")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eh5mi3h8",
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
    "id": "bzdvaut8",
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
    "id": "4zccy4lq",
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
    "id": "xneee422",
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
    "id": "9v6g1whs",
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
    "id": "hsrw0awv",
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
    "id": "lfv7jwzm",
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
    "id": "sjkig3xf",
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
  const collection = dao.findCollectionByNameOrId("x6qj2aggw38hgbr")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    SELECT\n      concat(o.id, '_paper') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      100 as \"order\",\n      concat(cp.name, ' ', ocp.cover_format) as \"name\",\n      occ.cover_sheets as \"value\",\n      'шт.' as units,\n      cp.price as rate,\n      round(occ.cover_sheets*cp.price, 1) as cost\n    FROM orders o,\n         orders_cover_processed ocp,\n         orders_cover_calc occ,\n         papers cp\n    WHERE ocp.id = o.id\n    AND   occ.id = o.id\n    AND   cp.id = o.cover_paper\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(occ.cover_sheets*cc.print_side_num/cp.outgo, 5) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      calc.\"value\"*100 as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3vabtkug",
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
    "id": "x0efxn2x",
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
    "id": "jqc7ofve",
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
    "id": "5r7erdxs",
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
    "id": "p7lywmbu",
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
    "id": "to5bb9hg",
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
    "id": "z3krrzvz",
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
    "id": "fqwisyld",
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
  collection.schema.removeField("eh5mi3h8")

  // remove
  collection.schema.removeField("bzdvaut8")

  // remove
  collection.schema.removeField("4zccy4lq")

  // remove
  collection.schema.removeField("xneee422")

  // remove
  collection.schema.removeField("9v6g1whs")

  // remove
  collection.schema.removeField("hsrw0awv")

  // remove
  collection.schema.removeField("lfv7jwzm")

  // remove
  collection.schema.removeField("sjkig3xf")

  return dao.saveCollection(collection)
})
