/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    strftime('%d.%m.%Y %H:%M', o.created, '+03:00') as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    12 as \"order\",\n    'Ламинация' as \"name\",\n    cl.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21+o.circulation*0.0012)/60.0, 2) as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      100 as \"order\",\n      'Подгтовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   NOT p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        0.5 as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover_ofset') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      101 as \"order\",\n      concat('Подготовка файлов ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15+4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      102 as \"order\",\n      concat('Вывод форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*p.speed), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           colors cc,\n           printers p\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cc.id = o.cover_color\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      103 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0+(oec.estimated_circulation)/(ocp.cover_multiplicity*p.speed), 2)\n          ELSE round(6/60.0+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*p.speed), 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           colors cc,\n           printers p,\n           papers pp\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cc.id = o.cover_color\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      104 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0+(oec.estimated_circulation*cl.side_num)/(ocp.cover_multiplicity*ocp.lamintaion_work_speed), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      105 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      106 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      107 as \"order\",\n      'Траспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      108 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.05)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_folding_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      109 as \"order\",\n      'Фальцовка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.0072)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_creasing_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      109 as \"order\",\n      'Биговка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n)\n"
  }

  // remove
  collection.schema.removeField("hwiti6to")

  // remove
  collection.schema.removeField("bgd8vqoj")

  // remove
  collection.schema.removeField("qsl2mvlp")

  // remove
  collection.schema.removeField("ouqz5dio")

  // remove
  collection.schema.removeField("ies1auil")

  // remove
  collection.schema.removeField("8t4xasvk")

  // remove
  collection.schema.removeField("jfktmxih")

  // remove
  collection.schema.removeField("jljsk68l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f9keuxnv",
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
    "id": "qh21dh8w",
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
    "id": "bcq8amfw",
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
    "id": "ogwkjamo",
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
    "id": "xg3nnupg",
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
    "id": "v385s1y0",
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
    "id": "ss3bnoea",
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
    "id": "n4fdhrwo",
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
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    strftime('%d.%m.%Y %H:%M', o.created, '+03:00') as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    12 as \"order\",\n    'Ламинация' as \"name\",\n    cl.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21+o.circulation*0.0012)/60.0, 2) as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      100 as \"order\",\n      'Подгтовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   NOT p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        0.5 as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover_ofset') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      101 as \"order\",\n      concat('Подготовка файлов ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15+4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      102 as \"order\",\n      concat('Вывод форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*p.speed), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           colors cc,\n           printers p\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cc.id = o.cover_color\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      103 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0+(oec.estimated_circulation)/(ocp.cover_multiplicity*p.speed), 2)\n          ELSE round(6/60.0+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*p.speed), 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           colors cc,\n           printers p,\n           papers pp\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cc.id = o.cover_color\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      104 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0+(oec.estimated_circulation*cl.side_num)/(ocp.cover_multiplicity*ocp.lamintaion_work_speed), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      105 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      106 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      107 as \"order\",\n      'Траспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      108 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hwiti6to",
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
    "id": "bgd8vqoj",
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
    "id": "qsl2mvlp",
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
    "id": "ouqz5dio",
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
    "id": "ies1auil",
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
    "id": "8t4xasvk",
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
    "id": "jfktmxih",
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
    "id": "jljsk68l",
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
  collection.schema.removeField("f9keuxnv")

  // remove
  collection.schema.removeField("qh21dh8w")

  // remove
  collection.schema.removeField("bcq8amfw")

  // remove
  collection.schema.removeField("ogwkjamo")

  // remove
  collection.schema.removeField("xg3nnupg")

  // remove
  collection.schema.removeField("v385s1y0")

  // remove
  collection.schema.removeField("ss3bnoea")

  // remove
  collection.schema.removeField("n4fdhrwo")

  return dao.saveCollection(collection)
})
