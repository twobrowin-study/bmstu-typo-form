/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6qj2aggw38hgbr")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    concat(o.id, '_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(occ.cover_sheets*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    concat(o.id, '_ofset_forms') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    102 as \"order\",\n    concat('Количество форм ', p.name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    p.price as rate,\n    round(occ.cover_ofset_forms*p.price, 1) as cost\n  FROM orders o,\n        printers p,\n        orders_cover_calc occ\n  WHERE occ.id = o.id\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  -- Количество мастер-плёнок ризографа\n  SELECT\n    concat(o.id, '_risograph_master_films') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    102 as \"order\",\n    concat('Мастер-плёнок ', p.name) as \"name\",\n    occ.cover_risograph_master_films as \"value\",\n    'шт.' as units,\n    p.price_1 as rate,\n    round(occ.cover_risograph_master_films*p.price_1, 1) as cost\n  FROM orders o,\n        printers p,\n        orders_cover_calc occ\n  WHERE occ.id = o.id\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n\n  UNION\n\n  -- Расход краски\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    rfcpo.\"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM report_fields_cover_printers_outgo rfcpo\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру\n  SELECT\n    concat(o.id, '_cover_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    131 as \"order\",\n    concat('Расходные материалы ', cp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    round(CASE\n      WHEN cp.is_risograph OR cp.is_digital AND NOT cc.is_color THEN occ.cover_sheets*ocp.cover_paper_price*0.4\n      WHEN cp.is_digital AND cc.is_color THEN occ.cover_sheets*ocp.cover_paper_price*0.6\n      WHEN cp.is_ofset THEN occ.cover_sheets*ocp.cover_paper_price*0.3\n    END, 1) as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       printers cp,\n       colors cc\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cc.id = o.cover_color\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n)"
  }

  // remove
  collection.schema.removeField("azregp1g")

  // remove
  collection.schema.removeField("abuwdyme")

  // remove
  collection.schema.removeField("sdgwuffw")

  // remove
  collection.schema.removeField("n1um3vdh")

  // remove
  collection.schema.removeField("cj0kxqyq")

  // remove
  collection.schema.removeField("uqzsrgot")

  // remove
  collection.schema.removeField("bajqazwy")

  // remove
  collection.schema.removeField("wzirfzle")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "njatnxsq",
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
    "id": "6mpx7oli",
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
    "id": "zakmlvac",
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
    "id": "9ejwjsgy",
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
    "id": "shrdo5ac",
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
    "id": "ki4gm8cn",
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
    "id": "clvvymtp",
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
    "id": "q7vekzic",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага\n  SELECT\n    concat(o.id, '_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(occ.cover_sheets*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    concat(o.id, '_ofset_forms') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    102 as \"order\",\n    concat('Количество форм ', p.name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    p.price as rate,\n    ceiling(occ.cover_ofset_forms*p.price) as cost\n  FROM orders o,\n        printers p,\n        orders_cover_calc occ\n  WHERE occ.id = o.id\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  -- Количество мастер-плёнок ризографа\n  SELECT\n    concat(o.id, '_risograph_master_films') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    102 as \"order\",\n    concat('Мастер-плёнок ', p.name) as \"name\",\n    occ.cover_risograph_master_films as \"value\",\n    'шт.' as units,\n    p.price_1 as rate,\n    ceiling(occ.cover_risograph_master_films*p.price_1) as cost\n  FROM orders o,\n        printers p,\n        orders_cover_calc occ\n  WHERE occ.id = o.id\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n\n  UNION\n\n  -- Расход краски\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    rfcpo.\"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM report_fields_cover_printers_outgo rfcpo\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру\n  SELECT\n    concat(o.id, '_cover_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    131 as \"order\",\n    concat('Расходные материалы ', cp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(CASE\n      WHEN cp.is_risograph OR cp.is_digital AND NOT cc.is_color THEN occ.cover_sheets*ocp.cover_paper_price*0.4\n      WHEN cp.is_digital AND cc.is_color THEN occ.cover_sheets*ocp.cover_paper_price*0.6\n      WHEN cp.is_ofset THEN occ.cover_sheets*ocp.cover_paper_price*0.3\n    END) as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       printers cp,\n       colors cc\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cc.id = o.cover_color\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azregp1g",
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
    "id": "abuwdyme",
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
    "id": "sdgwuffw",
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
    "id": "n1um3vdh",
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
    "id": "cj0kxqyq",
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
    "id": "uqzsrgot",
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
    "id": "bajqazwy",
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
    "id": "wzirfzle",
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
  collection.schema.removeField("njatnxsq")

  // remove
  collection.schema.removeField("6mpx7oli")

  // remove
  collection.schema.removeField("zakmlvac")

  // remove
  collection.schema.removeField("9ejwjsgy")

  // remove
  collection.schema.removeField("shrdo5ac")

  // remove
  collection.schema.removeField("ki4gm8cn")

  // remove
  collection.schema.removeField("clvvymtp")

  // remove
  collection.schema.removeField("q7vekzic")

  return dao.saveCollection(collection)
})
