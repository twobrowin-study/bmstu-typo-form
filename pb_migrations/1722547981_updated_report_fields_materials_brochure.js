/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqajfcxv56p9aoo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    concat(rfbpb.\"name\", ' блок'),\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    concat(rfcpb.\"name\", ' обложка'),\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      'Количество форм офсета' as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   p.is_ofset\n  )\n\n  -- UNION\n\n  -- -- Расходные материалы на офсет, ризограф и цифру\n  -- SELECT\n  --   concat(o.id, '_ofset_outgo') as id,\n  --   o.id as order_id,\n  --   '000006_materals' as section_id,\n  --   121 as \"order\",\n  --   concat('Расходные материалы', bp.name) as \"name\",\n  --   '' as \"value\",\n  --   '' as units,\n  --   f.price as rate,\n  --   round(oec.estimated_circulation*f.price, 1) as cost\n  -- FROM orders o,\n  --      report_fields_paper_brochure rfpb\n  -- WHERE rfpb.order_id = o.id\n  -- AND   \n  -- GROUP BY rfpb.order_id\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация обложки' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Пружины пластиквые\n  SELECT\n    concat(o.id, '_plastic_springs') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    121 as \"order\",\n    'Пружины пластиковые' as \"name\",\n    oec.estimated_circulation as \"value\",\n    'шт.' as units,\n    f.price as rate,\n    round(oec.estimated_circulation*f.price, 1) as cost\n  FROM orders o,\n       orders_estimated_circulation oec,\n       fastenings f\n  WHERE oec.id = o.id\n  AND   f.id = o.fastening\n  AND   f.is_plastic_spring\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_cover') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    122 as \"order\",\n    concat('Обложка прозрачная ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Подложка\n  SELECT\n    concat(o.id, '_transparent_backing') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    123 as \"order\",\n    concat('Подложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Термоклей и полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/350000 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      124 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      ceiling(calc.\"value\"*f.price) as cost\n    FROM orders o,\n        calc,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n)"
  }

  // remove
  collection.schema.removeField("ll6f63if")

  // remove
  collection.schema.removeField("aif1lyaa")

  // remove
  collection.schema.removeField("xwfr5wqh")

  // remove
  collection.schema.removeField("7fryhgzk")

  // remove
  collection.schema.removeField("dypophnv")

  // remove
  collection.schema.removeField("ikxt884m")

  // remove
  collection.schema.removeField("bftsyinj")

  // remove
  collection.schema.removeField("pxk641r3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3l5pr3ll",
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
    "id": "hz48p5ci",
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
    "id": "zqxfarl9",
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
    "id": "hoq7xvnn",
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
    "id": "oekbopvr",
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
    "id": "jo3wwjhw",
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
    "id": "labbnl7e",
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
    "id": "a4eseag6",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    rfcpb.\"name\",\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      'Количество форм офсета' as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   p.is_ofset\n  )\n\n  -- UNION\n\n  -- -- Расходные материалы на офсет, ризограф и цифру\n  -- SELECT\n  --   concat(o.id, '_ofset_outgo') as id,\n  --   o.id as order_id,\n  --   '000006_materals' as section_id,\n  --   121 as \"order\",\n  --   concat('Расходные материалы', bp.name) as \"name\",\n  --   '' as \"value\",\n  --   '' as units,\n  --   f.price as rate,\n  --   round(oec.estimated_circulation*f.price, 1) as cost\n  -- FROM orders o,\n  --      report_fields_paper_brochure rfpb\n  -- WHERE rfpb.order_id = o.id\n  -- AND   \n  -- GROUP BY rfpb.order_id\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация обложки' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Пружины пластиквые\n  SELECT\n    concat(o.id, '_plastic_springs') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    121 as \"order\",\n    'Пружины пластиковые' as \"name\",\n    oec.estimated_circulation as \"value\",\n    'шт.' as units,\n    f.price as rate,\n    round(oec.estimated_circulation*f.price, 1) as cost\n  FROM orders o,\n       orders_estimated_circulation oec,\n       fastenings f\n  WHERE oec.id = o.id\n  AND   f.id = o.fastening\n  AND   f.is_plastic_spring\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_cover') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    122 as \"order\",\n    concat('Обложка прозрачная ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Подложка\n  SELECT\n    concat(o.id, '_transparent_backing') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    123 as \"order\",\n    concat('Подложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Термоклей и полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/350000 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      124 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      ceiling(calc.\"value\"*f.price) as cost\n    FROM orders o,\n        calc,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ll6f63if",
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
    "id": "aif1lyaa",
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
    "id": "xwfr5wqh",
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
    "id": "7fryhgzk",
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
    "id": "dypophnv",
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
    "id": "ikxt884m",
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
    "id": "bftsyinj",
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
    "id": "pxk641r3",
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
  collection.schema.removeField("3l5pr3ll")

  // remove
  collection.schema.removeField("hz48p5ci")

  // remove
  collection.schema.removeField("zqxfarl9")

  // remove
  collection.schema.removeField("hoq7xvnn")

  // remove
  collection.schema.removeField("oekbopvr")

  // remove
  collection.schema.removeField("jo3wwjhw")

  // remove
  collection.schema.removeField("labbnl7e")

  // remove
  collection.schema.removeField("a4eseag6")

  return dao.saveCollection(collection)
})
