/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqajfcxv56p9aoo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Пружины пластиквые\n  SELECT\n    concat(o.id, '_plastic_springs') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    121 as \"order\",\n    'Пружины пластиковые' as \"name\",\n    oec.estimated_circulation as \"value\",\n    'шт.' as units,\n    f.price as rate,\n    round(oec.estimated_circulation*f.price, 1) as cost\n  FROM orders o,\n       orders_estimated_circulation oec,\n       fastenings f\n  WHERE oec.id = o.id\n  AND   f.id = o.fastening\n  AND   f.is_plastic_spring\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_cover') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    122 as \"order\",\n    concat('Прозрачная бложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_backing') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    123 as \"order\",\n    concat('Подложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n)"
  }

  // remove
  collection.schema.removeField("rw1rdlp4")

  // remove
  collection.schema.removeField("ms1ohdzw")

  // remove
  collection.schema.removeField("egv7dtba")

  // remove
  collection.schema.removeField("unk44s5s")

  // remove
  collection.schema.removeField("u5sxyvyx")

  // remove
  collection.schema.removeField("sgug5nhs")

  // remove
  collection.schema.removeField("3vleopco")

  // remove
  collection.schema.removeField("dowwxoma")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "thiqj1q1",
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
    "id": "dqmxqqi6",
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
    "id": "itbhgsqa",
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
    "id": "kmkr576u",
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
    "id": "shjkzvsp",
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
    "id": "fmip6afp",
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
    "id": "u3xmgxjz",
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
    "id": "4tel3mxi",
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
  const collection = dao.findCollectionByNameOrId("wqajfcxv56p9aoo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  -- UNION\n\n  -- -- Расход краски\n  -- SELECT\n  --   rfcpo.id,\n  --   rfcpo.order_id,\n  --   rfcpo.section_id,\n  --   rfcpo.\"order\",\n  --   rfcpo.\"name\",\n  --   rfcpo.\"value\",\n  --   rfcpo.units,\n  --   rfcpo.rate,\n  --   rfcpo.cost\n  -- FROM report_fields_cover_printers_outgo rfcpo\n\n  -- UNION\n\n  -- -- Цифровые расходники\n  -- SELECT\n  --   concat(rfcpo.order_id, '_digital_outgo') as id,\n  --   rfcpo.order_id as order_id,\n  --   '000006_materals' as section_id,\n  --   110 as \"order\",\n  --   'Цифровые расходники' as \"name\",\n  --   '' as \"value\",\n  --   '' as units,\n  --   '' as rate,\n  --   round(0.05 * sum(rfcpo.cost), 1) as cost\n  -- FROM report_fields_cover_printers_outgo rfcpo\n\n  -- UNION\n\n  -- -- Расходные материалы офсет и ризограф\n  -- SELECT\n  --   concat(o.id, '_printer_consumables_outgo') as id,\n  --   o.id as order_id,\n  --   '000006_materals' as section_id,\n  --   111 as \"order\",\n  --   concat('Расходные материалы ', p.name) as \"name\",\n  --   '' as \"value\",\n  --   '' as units,\n  --   '' as rate,\n  --   round(occ.cover_sheets*cp.price*0.4, 1) as cost\n  -- FROM orders o,\n  --       orders_cover_processed ocp,\n  --       orders_cover_calc occ,\n  --       papers cp,\n  --       printers p\n  -- WHERE ocp.id = o.id\n  -- AND   occ.id = o.id\n  -- AND   cp.id = o.cover_paper\n  -- AND   p.id = o.cover_printer\n  -- AND   (p.is_risograph OR p.is_ofset)\n\n  -- UNION\n\n  -- -- Ламинация\n  -- SELECT\n  --   id,\n  --   order_id,\n  --   section_id,\n  --   \"order\",\n  --   \"name\",\n  --   \"value\",\n  --   units,\n  --   rate,\n  --   cost\n  -- FROM (\n  --   WITH calc as (\n  --     SELECT\n  --       o.id as id,\n  --       clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n  --       clr.price as price\n  --     FROM orders o,\n  --          orders_cover_processed ocp,\n  --          orders_cover_calc occ,\n  --          cover_laminations cl,\n  --          cover_laminations_rules clr\n  --     WHERE ocp.id = o.id\n  --     AND   occ.id = o.id\n  --     AND   cl.id = o.cover_lamination\n  --     AND   clr.paper_format = ocp.cover_format\n  --   )\n  --   SELECT\n  --     concat(o.id, '_lamination_outgo') as id,\n  --     o.id as order_id,\n  --     '000006_materals' as section_id,\n  --     120 as \"order\",\n  --     'Ламинация' as \"name\",\n  --     calc.\"value\" as \"value\",\n  --     'м' as units,\n  --     calc.price as rate,\n  --     ceiling(calc.\"value\"*calc.price) as cost\n  --   FROM orders o,\n  --       calc,\n  --       cover_laminations cl\n  --   WHERE calc.id = o.id\n  --   AND   cl.id = cover_lamination\n  --   AND   NOT cl.is_empty\n  -- )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rw1rdlp4",
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
    "id": "ms1ohdzw",
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
    "id": "egv7dtba",
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
    "id": "unk44s5s",
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
    "id": "u5sxyvyx",
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
    "id": "sgug5nhs",
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
    "id": "3vleopco",
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
    "id": "dowwxoma",
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
  collection.schema.removeField("thiqj1q1")

  // remove
  collection.schema.removeField("dqmxqqi6")

  // remove
  collection.schema.removeField("itbhgsqa")

  // remove
  collection.schema.removeField("kmkr576u")

  // remove
  collection.schema.removeField("shjkzvsp")

  // remove
  collection.schema.removeField("fmip6afp")

  // remove
  collection.schema.removeField("u3xmgxjz")

  // remove
  collection.schema.removeField("4tel3mxi")

  return dao.saveCollection(collection)
})
