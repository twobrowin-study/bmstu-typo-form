/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6qj2aggw38hgbr")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    concat(o.id, '_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  UNION\n\n  -- Расход краски\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    rfcpo.\"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM report_fields_cover_printers_outgo rfcpo\n\n  UNION\n\n  -- Цифровые расходники\n  SELECT\n    concat(rfcpo.order_id, '_digital_outgo') as id,\n    rfcpo.order_id as order_id,\n    '000006_materals' as section_id,\n    110 as \"order\",\n    'Цифровые расходники' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    round(0.05 * sum(rfcpo.cost), 1) as cost\n  FROM report_fields_cover_printers_outgo rfcpo\n\n  UNION\n\n  -- Расходные материалы офсет и ризограф\n  SELECT\n    concat(o.id, '_printer_consumables') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    111 as \"order\",\n    concat('Расходные материалы ', p.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    round(occ.cover_sheets*cp.price*0.4, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp,\n        printers p\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   p.id = o.cover_printer\n  AND   (p.is_risograph OR p.is_ofset)\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n)"
  }

  // remove
  collection.schema.removeField("jfricaof")

  // remove
  collection.schema.removeField("ejpkrt6f")

  // remove
  collection.schema.removeField("0371qle9")

  // remove
  collection.schema.removeField("yprooib6")

  // remove
  collection.schema.removeField("otg4kqhb")

  // remove
  collection.schema.removeField("exfjq2we")

  // remove
  collection.schema.removeField("aecfy5lx")

  // remove
  collection.schema.removeField("dphvlshz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bhhkyjbr",
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
    "id": "udutatqq",
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
    "id": "qzi25if0",
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
    "id": "elu7iwzh",
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
    "id": "c3hywiiz",
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
    "id": "aihmogur",
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
    "id": "xlxd2zmo",
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
    "id": "oy4kjdby",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    concat(o.id, '_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  UNION\n\n  -- Расход краски\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    rfcpo.\"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM report_fields_cover_printers_outgo rfcpo\n\n  UNION\n\n  -- Цифровые расходники\n  SELECT\n    concat(rfcpo.order_id, '_digital_outgo') as id,\n    rfcpo.order_id as order_id,\n    '000006_materals' as section_id,\n    110 as \"order\",\n    'Цифровые расходники' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    round(0.05 * sum(rfcpo.cost), 1) as cost\n  FROM report_fields_cover_printers_outgo rfcpo\n\n  UNION\n\n  -- Расходные материалы офсет и ризограф\n  SELECT\n    concat(o.id, '_printer_consumables') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    111 as \"order\",\n    concat('Расходные материалы ', p.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price*0.4, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp,\n        printers p\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   p.id = o.cover_printer\n  AND   (p.is_risograph OR p.is_ofset)\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jfricaof",
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
    "id": "ejpkrt6f",
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
    "id": "0371qle9",
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
    "id": "yprooib6",
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
    "id": "otg4kqhb",
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
    "id": "exfjq2we",
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
    "id": "aecfy5lx",
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
    "id": "dphvlshz",
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
  collection.schema.removeField("bhhkyjbr")

  // remove
  collection.schema.removeField("udutatqq")

  // remove
  collection.schema.removeField("qzi25if0")

  // remove
  collection.schema.removeField("elu7iwzh")

  // remove
  collection.schema.removeField("c3hywiiz")

  // remove
  collection.schema.removeField("aihmogur")

  // remove
  collection.schema.removeField("xlxd2zmo")

  // remove
  collection.schema.removeField("oy4kjdby")

  return dao.saveCollection(collection)
})
