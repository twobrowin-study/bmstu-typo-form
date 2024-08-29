/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dfqgacya0juqh6k")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    concat(rfbpb.\"name\", ' блок') as \"name\",\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    concat(rfcpb.\"name\", ' обложка') as \"name\",\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Бумага на форзац\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (oec.estimated_circulation*8)/(bfr.multiplicity*4) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           printers p,\n           block_format_rules bfr,\n           json_each(bfr.format) as bfr_format,\n           json_each(bfr.printer) as bfr_printer\n      WHERE oec.id = o.id\n      AND   p.is_ofset\n      AND   bfr_format.value = o.format\n      AND   bfr_printer.value = p.id\n    )\n    SELECT\n      concat(o.id, '_flyleaf') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.1 as \"order\",\n      concat(p.name, ' 700*1000 форзац') as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      pp.price as rate,\n      round(calc.\"value\"*pp.price, 1) as cost\n    FROM orders o,\n         calc,\n         papers p,\n         paper_prices pp\n    WHERE calc.id = o.id\n    AND   p.is_flyleaf_paper\n    AND   pp.paper = p.id\n    AND   pp.format = '700*500'\n  )\n\n  UNION\n\n  -- Картон\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (oec.estimated_circulation*4)/bfr.multiplicity as \"value\",\n        82.67 as price\n      FROM orders o,\n           orders_estimated_circulation oec,\n           printers p,\n           block_format_rules bfr,\n           json_each(bfr.format) as bfr_format,\n           json_each(bfr.printer) as bfr_printer\n      WHERE oec.id = o.id\n      AND   p.is_ofset\n      AND   bfr_format.value = o.format\n      AND   bfr_printer.value = p.id\n    )\n    SELECT\n      concat(o.id, '_cardboard') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.2 as \"order\",\n      concat('Картон переплётный 780*1000') as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Каптал\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(obc.block_product_column_height*2/1000.0, 1) as \"value\",\n        4.53 as price\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_endband') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.3 as \"order\",\n      concat('Каптал') as \"name\",\n      calc.\"value\" as \"value\",\n      'м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Марля\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(f.larger_size_mm*obc.block_product_column_height*4/1000000.0, 1) as \"value\",\n        31 as price\n      FROM orders o,\n           orders_block_calc obc,\n           formats f\n      WHERE obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_endband') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.3 as \"order\",\n      concat('Марля') as \"name\",\n      calc.\"value\" as \"value\",\n      'м²' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Количество форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Количество мастер-плёнок ризографа\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_risograph_master_films,0) + ifnull(obc.block_risograph_master_films,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_risograph_master_films') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Мастер-плёнок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price_1 as rate,\n      round(calc.\"value\"*p.price_1, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Расход краски блока: Разные принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    concat(rfbpo.\"name\", ' блок') as \"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски обложки: Разные принтеры\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    concat(rfcpo.\"name\", ' блок') as \"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски: Одинаковые принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    rfbpo.\"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   oppe.printers_equals\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру\n  SELECT\n    concat(o.id, '_block_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    130 as \"order\",\n    concat('Расходные материалы ', bp.name, ' и ', cp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    (\n      round(CASE\n        WHEN bp.is_risograph OR bp.is_digital AND NOT bc.is_color THEN rfbpb.cost*0.4\n        WHEN bp.is_digital AND bc.is_color THEN rfbpb.cost*0.6\n        WHEN bp.is_ofset THEN rfbpb.cost*0.3\n      END, 1)\n      + \n      round(CASE\n        WHEN cp.is_risograph OR cp.is_digital AND NOT cc.is_color THEN rfcpb.cost*0.4\n        WHEN cp.is_digital AND cc.is_color THEN rfcpb.cost*0.6\n        WHEN cp.is_ofset THEN rfcpb.cost*0.3\n      END, 1)\n    ) as cost\n  FROM orders o,\n       report_fields_block_paper_brochure rfbpb,\n       printers bp,\n       colors bc,\n       report_fields_cover_paper_brochure rfcpb,\n       printers cp,\n       colors cc\n  WHERE rfbpb.order_id = o.id\n  AND   bp.id = o.block_printer\n  AND   bc.id = o.block_color\n  AND   rfcpb.order_id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cc.id = o.cover_color\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      133 as \"order\",\n      'Плёнка для ламинации' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'погонные м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Термоклей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height/350000.0 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      138 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      round(calc.\"value\"*f.price, 1) as cost\n    FROM orders o,\n         calc,\n         fastenings f\n    WHERE calc.id = o.id\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Шитьё\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/800000.0 as \"value\",\n        0.10 as price\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      139 as \"order\",\n      'Нитки' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Клей для обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        oec.estimated_circulation*0.006 as \"value\",\n        360 as price\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      140 as \"order\",\n      'Maniketti' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Клей ПВА\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        oec.estimated_circulation*0.004 as \"value\",\n        684 as price\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      141 as \"order\",\n      'Ситомелк К-610' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n)"
  }

  // remove
  collection.schema.removeField("jbpz1mfs")

  // remove
  collection.schema.removeField("gogwfpkz")

  // remove
  collection.schema.removeField("tnvj1hpm")

  // remove
  collection.schema.removeField("dqwqgiki")

  // remove
  collection.schema.removeField("nmbohetq")

  // remove
  collection.schema.removeField("3f92e1ey")

  // remove
  collection.schema.removeField("tdscc3gs")

  // remove
  collection.schema.removeField("ijdaktiy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r39ldizt",
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
    "id": "voexxzsl",
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
    "id": "2pxz5avw",
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
    "id": "1cp3ldld",
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
    "id": "2mhjyvt4",
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
    "id": "cna0ehh5",
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
    "id": "lkejflcv",
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
    "id": "vtiym0fq",
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
  const collection = dao.findCollectionByNameOrId("dfqgacya0juqh6k")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    concat(rfbpb.\"name\", ' блок') as \"name\",\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    concat(rfcpb.\"name\", ' обложка') as \"name\",\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Бумага на форзац\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (oec.estimated_circulation*8)/bfr.multiplicity as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           printers p,\n           block_format_rules bfr,\n           json_each(bfr.format) as bfr_format,\n           json_each(bfr.printer) as bfr_printer\n      WHERE oec.id = o.id\n      AND   p.is_ofset\n      AND   bfr_format.value = o.format\n      AND   bfr_printer.value = p.id\n    )\n    SELECT\n      concat(o.id, '_flyleaf') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.1 as \"order\",\n      concat(p.name, ' 700*1000 форзац') as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      pp.price as rate,\n      round(calc.\"value\"*pp.price, 1) as cost\n    FROM orders o,\n         calc,\n         papers p,\n         paper_prices pp\n    WHERE calc.id = o.id\n    AND   p.is_flyleaf_paper\n    AND   pp.paper = p.id\n    AND   pp.format = '700*500'\n  )\n\n  UNION\n\n  -- Картон\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (oec.estimated_circulation*4)/bfr.multiplicity as \"value\",\n        82.67 as price\n      FROM orders o,\n           orders_estimated_circulation oec,\n           printers p,\n           block_format_rules bfr,\n           json_each(bfr.format) as bfr_format,\n           json_each(bfr.printer) as bfr_printer\n      WHERE oec.id = o.id\n      AND   p.is_ofset\n      AND   bfr_format.value = o.format\n      AND   bfr_printer.value = p.id\n    )\n    SELECT\n      concat(o.id, '_cardboard') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.2 as \"order\",\n      concat('Картон переплётный 780*1000') as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Каптал\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(obc.block_product_column_height*2/1000.0, 1) as \"value\",\n        4.53 as price\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_endband') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.3 as \"order\",\n      concat('Каптал') as \"name\",\n      calc.\"value\" as \"value\",\n      'м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Марля\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(f.larger_size_mm*obc.block_product_column_height*4/1000000.0, 1) as \"value\",\n        31 as price\n      FROM orders o,\n           orders_block_calc obc,\n           formats f\n      WHERE obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_endband') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101.3 as \"order\",\n      concat('Марля') as \"name\",\n      calc.\"value\" as \"value\",\n      'м²' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Количество форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Количество мастер-плёнок ризографа\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_risograph_master_films,0) + ifnull(obc.block_risograph_master_films,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_risograph_master_films') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Мастер-плёнок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price_1 as rate,\n      round(calc.\"value\"*p.price_1, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Расход краски блока: Разные принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    concat(rfbpo.\"name\", ' блок') as \"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски обложки: Разные принтеры\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    concat(rfcpo.\"name\", ' блок') as \"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски: Одинаковые принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    rfbpo.\"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   oppe.printers_equals\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру\n  SELECT\n    concat(o.id, '_block_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    130 as \"order\",\n    concat('Расходные материалы ', bp.name, ' и ', cp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    (\n      round(CASE\n        WHEN bp.is_risograph OR bp.is_digital AND NOT bc.is_color THEN rfbpb.cost*0.4\n        WHEN bp.is_digital AND bc.is_color THEN rfbpb.cost*0.6\n        WHEN bp.is_ofset THEN rfbpb.cost*0.3\n      END, 1)\n      + \n      round(CASE\n        WHEN cp.is_risograph OR cp.is_digital AND NOT cc.is_color THEN rfcpb.cost*0.4\n        WHEN cp.is_digital AND cc.is_color THEN rfcpb.cost*0.6\n        WHEN cp.is_ofset THEN rfcpb.cost*0.3\n      END, 1)\n    ) as cost\n  FROM orders o,\n       report_fields_block_paper_brochure rfbpb,\n       printers bp,\n       colors bc,\n       report_fields_cover_paper_brochure rfcpb,\n       printers cp,\n       colors cc\n  WHERE rfbpb.order_id = o.id\n  AND   bp.id = o.block_printer\n  AND   bc.id = o.block_color\n  AND   rfcpb.order_id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cc.id = o.cover_color\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      133 as \"order\",\n      'Плёнка для ламинации' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'погонные м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Термоклей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height/350000.0 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      138 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      round(calc.\"value\"*f.price, 1) as cost\n    FROM orders o,\n         calc,\n         fastenings f\n    WHERE calc.id = o.id\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Шитьё\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/800000.0 as \"value\",\n        0.10 as price\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      139 as \"order\",\n      'Нитки' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Клей для обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        oec.estimated_circulation*0.006 as \"value\",\n        360 as price\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      140 as \"order\",\n      'Maniketti' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n\n  UNION\n\n  -- Клей ПВА\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        oec.estimated_circulation*0.004 as \"value\",\n        684 as price\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      141 as \"order\",\n      'Ситомелк К-610' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jbpz1mfs",
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
    "id": "gogwfpkz",
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
    "id": "tnvj1hpm",
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
    "id": "dqwqgiki",
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
    "id": "nmbohetq",
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
    "id": "3f92e1ey",
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
    "id": "tdscc3gs",
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
    "id": "ijdaktiy",
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
  collection.schema.removeField("r39ldizt")

  // remove
  collection.schema.removeField("voexxzsl")

  // remove
  collection.schema.removeField("2pxz5avw")

  // remove
  collection.schema.removeField("1cp3ldld")

  // remove
  collection.schema.removeField("2mhjyvt4")

  // remove
  collection.schema.removeField("cna0ehh5")

  // remove
  collection.schema.removeField("lkejflcv")

  // remove
  collection.schema.removeField("vtiym0fq")

  return dao.saveCollection(collection)
})
