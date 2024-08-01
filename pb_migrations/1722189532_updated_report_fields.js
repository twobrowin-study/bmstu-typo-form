/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    strftime('%d.%m.%Y %H:%M', o.created, '+03:00') as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    12 as \"order\",\n    'Ламинация' as \"name\",\n    cl.name as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21+o.circulation*0.0012)/60.0, 2) as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      100 as \"order\",\n      'Подгтовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      calc.\"value\"*dg.price as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   NOT p.is_ofset\n  )\n)\n"
  }

  // remove
  collection.schema.removeField("orrz9kai")

  // remove
  collection.schema.removeField("kggd8wbb")

  // remove
  collection.schema.removeField("6hkuv6vl")

  // remove
  collection.schema.removeField("15mergns")

  // remove
  collection.schema.removeField("5f8fwabs")

  // remove
  collection.schema.removeField("hzp0v7t4")

  // remove
  collection.schema.removeField("howhwqje")

  // remove
  collection.schema.removeField("zdhbqoge")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vg6hkmex",
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
    "id": "vvxqwrhr",
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
    "id": "j6wbtom0",
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
    "id": "sshfu3l2",
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
    "id": "lvs2vbcb",
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
    "id": "xzfdsag6",
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
    "id": "4kps17b6",
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
    "id": "jjbaoc5b",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    strftime('%d.%m.%Y %H:%M', o.created, '+03:00') as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    '000000001_order' as section_id,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    '000000002_block' as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    11 as \"order\",\n    'Печатная машина' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_report_section as section_id,\n    12 as \"order\",\n    'Ламинация' as \"name\",\n    cl.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    100 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    101 as \"order\",\n    'Подготовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    102 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    (round((15+4*occ.cover_ofset_forms)/60.0, 2)) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    ceiling((round((15+4*occ.cover_ofset_forms)/60.0, 2))*dg.price) as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_risograph_print_work') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    103 as \"order\",\n    'Печать ризограф' as \"name\",\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc\n  WHERE dg.name = 2\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n  AND   occ.id = o.id\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "orrz9kai",
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
    "id": "kggd8wbb",
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
    "id": "6hkuv6vl",
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
    "id": "15mergns",
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
    "id": "5f8fwabs",
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
    "id": "hzp0v7t4",
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
    "id": "howhwqje",
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
    "id": "zdhbqoge",
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
  collection.schema.removeField("vg6hkmex")

  // remove
  collection.schema.removeField("vvxqwrhr")

  // remove
  collection.schema.removeField("j6wbtom0")

  // remove
  collection.schema.removeField("sshfu3l2")

  // remove
  collection.schema.removeField("lvs2vbcb")

  // remove
  collection.schema.removeField("xzfdsag6")

  // remove
  collection.schema.removeField("4kps17b6")

  // remove
  collection.schema.removeField("jjbaoc5b")

  return dao.saveCollection(collection)
})
