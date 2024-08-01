/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqajfcxv56p9aoo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    concat(rfbpb.\"name\", ' блок') as \"name\",\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    concat(rfcpb.\"name\", ' обложка') as \"name\",\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      'Количество форм офсета' as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру на блок: разные принтеры\n  SELECT\n    concat(o.id, '_block_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    118 as \"order\",\n    concat('Расходные материалы', bp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    (CASE\n      WHEN bp.is_risograph OR bp.is_digital AND NOT bc.is_color THEN rfbpb.rate*0.5\n      WHEN bp.is_digital AND bc.is_color THEN rfbpb.rate*0.7\n      WHEN bp.is_ofset THEN rfbpb.rate*0.4\n    END) as rate\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       printers bp,\n       colors bc\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.printers_equals\n  AND   bp.id = o.block_printer\n  AND   bc.id = o.block_color\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация обложки' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Пружины пластиквые\n  SELECT\n    concat(o.id, '_plastic_springs') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    121 as \"order\",\n    'Пружины пластиковые' as \"name\",\n    oec.estimated_circulation as \"value\",\n    'шт.' as units,\n    f.price as rate,\n    round(oec.estimated_circulation*f.price, 1) as cost\n  FROM orders o,\n       orders_estimated_circulation oec,\n       fastenings f\n  WHERE oec.id = o.id\n  AND   f.id = o.fastening\n  AND   f.is_plastic_spring\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_cover') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    122 as \"order\",\n    concat('Обложка прозрачная ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Подложка\n  SELECT\n    concat(o.id, '_transparent_backing') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    123 as \"order\",\n    concat('Подложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Термоклей и полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/350000 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      124 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      ceiling(calc.\"value\"*f.price) as cost\n    FROM orders o,\n        calc,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n)"
  }

  // remove
  collection.schema.removeField("zsel3msl")

  // remove
  collection.schema.removeField("37yzsorl")

  // remove
  collection.schema.removeField("mqui3gze")

  // remove
  collection.schema.removeField("oqzl81mj")

  // remove
  collection.schema.removeField("iyrvdkm7")

  // remove
  collection.schema.removeField("gzxfr0j8")

  // remove
  collection.schema.removeField("xdvrrvoj")

  // remove
  collection.schema.removeField("tb331lx1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w8atxnqe",
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
    "id": "skjpbatg",
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
    "id": "6smrh1q4",
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
    "id": "hy8t5ldh",
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
    "id": "jt8kzlxp",
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
    "id": "oj8kfgzt",
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
    "id": "ymao1qb9",
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
    "id": "8gqiocog",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    concat(rfbpb.\"name\", ' блок') as \"name\",\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    concat(rfcpb.\"name\", ' обложка') as \"name\",\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      'Количество форм офсета' as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру на блок: разные принтеры\n  SELECT\n    concat(o.id, '_block_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    118 as \"order\",\n    concat('Расходные материалы', bp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(CASE\n      WHEN bp.is_risograph OR bp.is_digital AND NOT bc.is_color THEN rfbpb.rate*0.5\n      WHEN bp.is_digital AND bc.is_color THEN rfbpb.rate*0.7\n      WHEN bp.is_ofset THEN rfbpb.rate*0.4\n    END) as rate\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       printers bp,\n       colors bc\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.printers_equals\n  AND   bp.id = o.block_printer\n  AND   bc.id = o.block_color\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация обложки' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Пружины пластиквые\n  SELECT\n    concat(o.id, '_plastic_springs') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    121 as \"order\",\n    'Пружины пластиковые' as \"name\",\n    oec.estimated_circulation as \"value\",\n    'шт.' as units,\n    f.price as rate,\n    round(oec.estimated_circulation*f.price, 1) as cost\n  FROM orders o,\n       orders_estimated_circulation oec,\n       fastenings f\n  WHERE oec.id = o.id\n  AND   f.id = o.fastening\n  AND   f.is_plastic_spring\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_cover') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    122 as \"order\",\n    concat('Обложка прозрачная ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Подложка\n  SELECT\n    concat(o.id, '_transparent_backing') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    123 as \"order\",\n    concat('Подложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Термоклей и полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/350000 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      124 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      ceiling(calc.\"value\"*f.price) as cost\n    FROM orders o,\n        calc,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zsel3msl",
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
    "id": "37yzsorl",
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
    "id": "mqui3gze",
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
    "id": "oqzl81mj",
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
    "id": "iyrvdkm7",
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
    "id": "gzxfr0j8",
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
    "id": "xdvrrvoj",
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
    "id": "tb331lx1",
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
  collection.schema.removeField("w8atxnqe")

  // remove
  collection.schema.removeField("skjpbatg")

  // remove
  collection.schema.removeField("6smrh1q4")

  // remove
  collection.schema.removeField("hy8t5ldh")

  // remove
  collection.schema.removeField("jt8kzlxp")

  // remove
  collection.schema.removeField("oj8kfgzt")

  // remove
  collection.schema.removeField("ymao1qb9")

  // remove
  collection.schema.removeField("8gqiocog")

  return dao.saveCollection(collection)
})
