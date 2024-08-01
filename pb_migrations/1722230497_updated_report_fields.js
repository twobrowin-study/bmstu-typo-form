/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Дата создания заказа\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    strftime('%d.%m.%Y %H:%M', o.created, '+03:00') as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  -- Название\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  -- Номер\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  -- Тип\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  -- Тираж\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  -- Формат\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  -- Количество страниц\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  -- Вид крепления\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  -- Бумага\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  -- Цветность\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  -- Элементы на вылет\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  -- Печатная машина\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  -- Бумага\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  -- Цветность\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  -- Элементы на вылет\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  -- Печатная машина\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    12 as \"order\",\n    'Ламинация' as \"name\",\n    cl.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Подгтовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.circulation*0.0012)/60.0, 2) as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      100 as \"order\",\n      'Подгтовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   NOT p.is_ofset\n  )\n\n  UNION\n\n  -- Подготовка файлов офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        0.5 as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover_ofset') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      101 as \"order\",\n      concat('Подготовка файлов ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      102 as \"order\",\n      concat('Вывод форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0 + occ.cover_print_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      103 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать цифра\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0 + occ.cover_sheets*p.speed, 2)\n          ELSE round(6/60.0 + occ.cover_print_sheets*p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p,\n           papers pp\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      104 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/ocp.lamintaion_work_speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      105 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      106 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      107 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      108 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Фальцовка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.05)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_folding_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      109 as \"order\",\n      'Фальцовка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Биговка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.0072)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_creasing_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      110 as \"order\",\n      'Биговка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n)\n"
  }

  // remove
  collection.schema.removeField("fzxq1b7f")

  // remove
  collection.schema.removeField("m5fgjki5")

  // remove
  collection.schema.removeField("b2qwlkxi")

  // remove
  collection.schema.removeField("eodgbg2k")

  // remove
  collection.schema.removeField("xjapslgy")

  // remove
  collection.schema.removeField("gkz0klmb")

  // remove
  collection.schema.removeField("bm3yhjoe")

  // remove
  collection.schema.removeField("nzrmxfdn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xlmcjuvc",
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
    "id": "bptesiia",
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
    "id": "sbqsof0y",
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
    "id": "05ufwior",
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
    "id": "80yudkje",
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
    "id": "xizs0xpu",
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
    "id": "sanqmv6a",
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
    "id": "hntzc3sw",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    strftime('%d.%m.%Y %H:%M', o.created, '+03:00') as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    12 as \"order\",\n    'Ламинация' as \"name\",\n    cl.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21+o.circulation*0.0012)/60.0, 2) as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      100 as \"order\",\n      'Подгтовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   NOT p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        0.5 as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover_ofset') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      101 as \"order\",\n      concat('Подготовка файлов ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15+4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      102 as \"order\",\n      concat('Вывод форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*p.speed), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           colors cc,\n           printers p\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cc.id = o.cover_color\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      103 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0+(oec.estimated_circulation)/(ocp.cover_multiplicity*p.speed), 2)\n          ELSE round(6/60.0+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*p.speed), 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           colors cc,\n           printers p,\n           papers pp\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cc.id = o.cover_color\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      104 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0+(oec.estimated_circulation*cl.side_num)/(ocp.cover_multiplicity*ocp.lamintaion_work_speed), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      105 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      106 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      107 as \"order\",\n      'Траспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      108 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.05)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_folding_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      109 as \"order\",\n      'Фальцовка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.0072)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_creasing_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      110 as \"order\",\n      'Биговка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzxq1b7f",
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
    "id": "m5fgjki5",
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
    "id": "b2qwlkxi",
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
    "id": "eodgbg2k",
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
    "id": "xjapslgy",
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
    "id": "gkz0klmb",
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
    "id": "bm3yhjoe",
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
    "id": "nzrmxfdn",
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
  collection.schema.removeField("xlmcjuvc")

  // remove
  collection.schema.removeField("bptesiia")

  // remove
  collection.schema.removeField("sbqsof0y")

  // remove
  collection.schema.removeField("05ufwior")

  // remove
  collection.schema.removeField("80yudkje")

  // remove
  collection.schema.removeField("xizs0xpu")

  // remove
  collection.schema.removeField("sanqmv6a")

  // remove
  collection.schema.removeField("hntzc3sw")

  return dao.saveCollection(collection)
})
