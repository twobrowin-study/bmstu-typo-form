/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6qj2aggw38hgbr")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    SELECT\n      concat(o.id, '_paper') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      100 as \"order\",\n      concat(cp.name, ' ', ocp.cover_format) as \"name\",\n      occ.cover_sheets as \"value\",\n      'шт.' as units,\n      cp.price as rate,\n      round(occ.cover_sheets*cp.price, 1) as cost\n    FROM orders o,\n         orders_cover_processed ocp,\n         orders_cover_calc occ,\n         papers cp\n    WHERE ocp.id = o.id\n    AND   occ.id = o.id\n    AND   cp.id = o.cover_paper\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        occ.cover_sheets*cc.print_side_num/cp.outgo as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      calc.\"value\"*100 as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n)"
  }

  // remove
  collection.schema.removeField("upo6gri4")

  // remove
  collection.schema.removeField("6qseo6jc")

  // remove
  collection.schema.removeField("dyhjcviz")

  // remove
  collection.schema.removeField("ogmohhyr")

  // remove
  collection.schema.removeField("7powf41e")

  // remove
  collection.schema.removeField("xbkjj18r")

  // remove
  collection.schema.removeField("ewyvy0wc")

  // remove
  collection.schema.removeField("q33na7ws")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ryj69zys",
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
    "id": "xz1c7bvw",
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
    "id": "r4pvnhx1",
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
    "id": "ros4pe8y",
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
    "id": "pwzaoicd",
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
    "id": "prq6run0",
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
    "id": "6acodgvc",
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
    "id": "ezflg09v",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    SELECT\n      concat(o.id, '_paper') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      100 as \"order\",\n      concat(cp.name, ' ', ocp.cover_format) as \"name\",\n      occ.cover_sheets as \"value\",\n      'шт.' as units,\n      cp.price as rate,\n      round(occ.cover_sheets*cp.price, 1) as cost\n    FROM orders o,\n         orders_cover_processed ocp,\n         orders_cover_calc occ,\n         papers cp\n    WHERE ocp.id = o.id\n    AND   occ.id = o.id\n    AND   cp.id = o.cover_paper\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        0 as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      calc.\"value\"*100 as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "upo6gri4",
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
    "id": "6qseo6jc",
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
    "id": "dyhjcviz",
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
    "id": "ogmohhyr",
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
    "id": "7powf41e",
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
    "id": "xbkjj18r",
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
    "id": "ewyvy0wc",
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
    "id": "q33na7ws",
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
  collection.schema.removeField("ryj69zys")

  // remove
  collection.schema.removeField("xz1c7bvw")

  // remove
  collection.schema.removeField("r4pvnhx1")

  // remove
  collection.schema.removeField("ros4pe8y")

  // remove
  collection.schema.removeField("pwzaoicd")

  // remove
  collection.schema.removeField("prq6run0")

  // remove
  collection.schema.removeField("6acodgvc")

  // remove
  collection.schema.removeField("ezflg09v")

  return dao.saveCollection(collection)
})
