/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dfqgacya0juqh6k")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    concat(rfbpb.\"name\", ' блок') as \"name\",\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    concat(rfcpb.\"name\", ' обложка') as \"name\",\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Бумага на форзац\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        oec.estimated_circulation*8 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_flyleaf') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102.1 as \"order\",\n      concat(p.name, ' 700*1000 форзац') as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      pp.price as rate,\n      round(calc.\"value\"*pp.price, 1) as cost\n    FROM orders o,\n         calc,\n         papers p,\n         paper_prices pp\n    WHERE calc.id = o.id\n    AND   p.is_flyleaf_paper\n    AND   pp.paper = p.id\n    AND   pp.format = '700*500'\n  )\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Количество форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Количество мастер-плёнок ризографа\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_risograph_master_films,0) + ifnull(obc.block_risograph_master_films,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_risograph_master_films') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Мастер-плёнок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price_1 as rate,\n      round(calc.\"value\"*p.price_1, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Расход краски блока: Разные принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    concat(rfbpo.\"name\", ' блок') as \"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски обложки: Разные принтеры\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    concat(rfcpo.\"name\", ' блок') as \"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски: Одинаковые принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    rfbpo.\"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   oppe.printers_equals\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру\n  SELECT\n    concat(o.id, '_block_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    130 as \"order\",\n    concat('Расходные материалы ', bp.name, ' и ', cp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    (\n      round(CASE\n        WHEN bp.is_risograph OR bp.is_digital AND NOT bc.is_color THEN rfbpb.cost*0.4\n        WHEN bp.is_digital AND bc.is_color THEN rfbpb.cost*0.6\n        WHEN bp.is_ofset THEN rfbpb.cost*0.3\n      END, 1)\n      + \n      round(CASE\n        WHEN cp.is_risograph OR cp.is_digital AND NOT cc.is_color THEN rfcpb.cost*0.4\n        WHEN cp.is_digital AND cc.is_color THEN rfcpb.cost*0.6\n        WHEN cp.is_ofset THEN rfcpb.cost*0.3\n      END, 1)\n    ) as cost\n  FROM orders o,\n       report_fields_block_paper_brochure rfbpb,\n       printers bp,\n       colors bc,\n       report_fields_cover_paper_brochure rfcpb,\n       printers cp,\n       colors cc\n  WHERE rfbpb.order_id = o.id\n  AND   bp.id = o.block_printer\n  AND   bc.id = o.block_color\n  AND   rfcpb.order_id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cc.id = o.cover_color\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      133 as \"order\",\n      'Плёнка для ламинации' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'погонные м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Термоклей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height/350000.0 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      138 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      round(calc.\"value\"*f.price, 1) as cost\n    FROM orders o,\n         calc,\n         fastenings f\n    WHERE calc.id = o.id\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Шитьё\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/800000.0 as \"value\",\n        0.10 as price\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      139 as \"order\",\n      'Нитка' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n    AND   o.sewing\n  )\n)"
  }

  // remove
  collection.schema.removeField("evrqjpl9")

  // remove
  collection.schema.removeField("mxtpfqiy")

  // remove
  collection.schema.removeField("nnrnnlw5")

  // remove
  collection.schema.removeField("zaq8on5v")

  // remove
  collection.schema.removeField("aksa0uyr")

  // remove
  collection.schema.removeField("zuu66yuu")

  // remove
  collection.schema.removeField("3yp8xr5h")

  // remove
  collection.schema.removeField("2womysov")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "08auhwnj",
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
    "id": "tmtdqzf5",
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
    "id": "mi92jokp",
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
    "id": "oxk3iblc",
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
    "id": "1mzf2mme",
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
    "id": "zws9pmru",
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
    "id": "x0jgc5qu",
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
    "id": "pbaxuuiv",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок: Разная бумага\n  SELECT\n    rfbpb.id,\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    concat(rfbpb.\"name\", ' блок') as \"name\",\n    rfbpb.\"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    rfbpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на обложку: Разная бумага\n  SELECT\n    rfcpb.id,\n    rfcpb.order_id,\n    rfcpb.section_id,\n    rfcpb.\"order\",\n    concat(rfcpb.\"name\", ' обложка') as \"name\",\n    rfcpb.\"value\",\n    rfcpb.units,\n    rfcpb.rate,\n    rfcpb.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   NOT oppe.papers_equals\n\n  UNION\n\n  -- Бумага на блок и обложку: Одинаковая бумага\n  SELECT\n    concat(rfbpb.id, rfcpb.id),\n    rfbpb.order_id,\n    rfbpb.section_id,\n    rfbpb.\"order\",\n    rfbpb.\"name\",\n    (rfbpb.\"value\" + rfcpb.\"value\") as \"value\",\n    rfbpb.units,\n    rfbpb.rate,\n    (rfbpb.cost + rfcpb.cost) as cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_paper_brochure rfbpb,\n       report_fields_cover_paper_brochure rfcpb\n  WHERE oppe.id = o.id\n  AND   rfbpb.order_id = o.id\n  AND   rfcpb.order_id = o.id\n  AND   oppe.papers_equals\n\n  UNION\n\n  -- Бумага на форзац\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        oec.estimated_circulation*8 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           printers p\n      WHERE oec.id = o.id\n      AND   p.is_ofset\n    )\n    SELECT\n      concat(o.id, '_flyleaf') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102.1 as \"order\",\n      concat(p.name, ' 700*1000 форзац') as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      pp.price as rate,\n      round(calc.\"value\"*pp.price, 1) as cost\n    FROM orders o,\n         calc,\n         papers p,\n         paper_prices pp\n    WHERE calc.id = o.id\n    AND   p.is_flyleaf_paper\n    AND   pp.paper = p.id\n    AND   pp.format = '700*500'\n  )\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Количество форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      round(calc.\"value\"*p.price, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Количество мастер-плёнок ризографа\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_risograph_master_films,0) + ifnull(obc.block_risograph_master_films,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_risograph_master_films') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Мастер-плёнок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price_1 as rate,\n      round(calc.\"value\"*p.price_1, 1) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   (p.id = o.cover_printer OR p.id = o.block_printer)\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Расход краски блока: Разные принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    concat(rfbpo.\"name\", ' блок') as \"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски обложки: Разные принтеры\n  SELECT\n    rfcpo.id,\n    rfcpo.order_id,\n    rfcpo.section_id,\n    rfcpo.\"order\",\n    concat(rfcpo.\"name\", ' блок') as \"name\",\n    rfcpo.\"value\",\n    rfcpo.units,\n    rfcpo.rate,\n    rfcpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   NOT oppe.printers_equals\n\n  UNION\n\n  -- Расход краски: Одинаковые принтеры\n  SELECT\n    rfbpo.id,\n    rfbpo.order_id,\n    rfbpo.section_id,\n    rfbpo.\"order\",\n    rfbpo.\"name\",\n    rfbpo.\"value\",\n    rfbpo.units,\n    rfbpo.rate,\n    rfbpo.cost\n  FROM orders o,\n       orders_papers_printers_equal oppe,\n       report_fields_block_printers_outgo rfbpo,\n       report_fields_cover_printers_outgo rfcpo\n  WHERE oppe.id = o.id\n  AND   rfbpo.order_id = o.id\n  AND   rfcpo.order_id = o.id\n  AND   oppe.printers_equals\n\n  UNION\n\n  -- Расходные материалы на офсет, ризограф и цифру\n  SELECT\n    concat(o.id, '_block_printer_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    130 as \"order\",\n    concat('Расходные материалы ', bp.name, ' и ', cp.name) as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    (\n      round(CASE\n        WHEN bp.is_risograph OR bp.is_digital AND NOT bc.is_color THEN rfbpb.cost*0.4\n        WHEN bp.is_digital AND bc.is_color THEN rfbpb.cost*0.6\n        WHEN bp.is_ofset THEN rfbpb.cost*0.3\n      END, 1)\n      + \n      round(CASE\n        WHEN cp.is_risograph OR cp.is_digital AND NOT cc.is_color THEN rfcpb.cost*0.4\n        WHEN cp.is_digital AND cc.is_color THEN rfcpb.cost*0.6\n        WHEN cp.is_ofset THEN rfcpb.cost*0.3\n      END, 1)\n    ) as cost\n  FROM orders o,\n       report_fields_block_paper_brochure rfbpb,\n       printers bp,\n       colors bc,\n       report_fields_cover_paper_brochure rfcpb,\n       printers cp,\n       colors cc\n  WHERE rfbpb.order_id = o.id\n  AND   bp.id = o.block_printer\n  AND   bc.id = o.block_color\n  AND   rfcpb.order_id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cc.id = o.cover_color\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      133 as \"order\",\n      'Плёнка для ламинации' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'погонные м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Термоклей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height/350000.0 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      138 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      round(calc.\"value\"*f.price, 1) as cost\n    FROM orders o,\n         calc,\n         fastenings f\n    WHERE calc.id = o.id\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Шитьё\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/800000.0 as \"value\",\n        0.10 as price\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_glue_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      139 as \"order\",\n      'Нитка' as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      round(calc.\"value\"*calc.price, 1) as cost\n    FROM orders o,\n         calc\n    WHERE calc.id = o.id\n    AND   o.sewing\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evrqjpl9",
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
    "id": "mxtpfqiy",
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
    "id": "nnrnnlw5",
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
    "id": "zaq8on5v",
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
    "id": "aksa0uyr",
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
    "id": "zuu66yuu",
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
    "id": "3yp8xr5h",
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
    "id": "2womysov",
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
  collection.schema.removeField("08auhwnj")

  // remove
  collection.schema.removeField("tmtdqzf5")

  // remove
  collection.schema.removeField("mi92jokp")

  // remove
  collection.schema.removeField("oxk3iblc")

  // remove
  collection.schema.removeField("1mzf2mme")

  // remove
  collection.schema.removeField("zws9pmru")

  // remove
  collection.schema.removeField("x0jgc5qu")

  // remove
  collection.schema.removeField("pbaxuuiv")

  return dao.saveCollection(collection)
})
