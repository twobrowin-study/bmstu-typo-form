/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    o.created as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    'Блок' as section,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    'Блок' as section,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    'Блок' as section,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    'Блок' as section,\n    11 as \"order\",\n    'Цветность' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    11 as \"order\",\n    'Цветность' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    12 as \"order\",\n    'Ламинация' as \"name\",\n    cl.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    100 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    101 as \"order\",\n    'Подготовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    102 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2)) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2))*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_risograph_print_work') as id,\n    o.id as order_id,\n    'Работы' as section,\n    103 as \"order\",\n    'Печать ризограф' as \"name\",\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc\n  WHERE dg.name = 2\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n  AND   occ.id = o.id\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n)\n"
  }

  // remove
  collection.schema.removeField("ehmzblj0")

  // remove
  collection.schema.removeField("586yhtpu")

  // remove
  collection.schema.removeField("gudrhwxj")

  // remove
  collection.schema.removeField("rs2ilrti")

  // remove
  collection.schema.removeField("pwus8saf")

  // remove
  collection.schema.removeField("tuzxz7v2")

  // remove
  collection.schema.removeField("andnasyl")

  // remove
  collection.schema.removeField("ywgznf8q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lu1hklne",
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
    "id": "jbae2uye",
    "name": "section",
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
    "id": "eewoihob",
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
    "id": "zba6eyup",
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
    "id": "6ezua3yj",
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
    "id": "te8vgfwc",
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
    "id": "gd1fi1rk",
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
    "id": "tcyozmoy",
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
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    o.created as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_type') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    3 as \"order\",\n    'Тип' as \"name\",\n    ot.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    4 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    5 as \"order\",\n    'Формат' as \"name\",\n    f.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       formats f\n  WHERE f.id = o.format\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    6 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_page_num\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    7 as \"order\",\n    'Вид крепления' as \"name\",\n    f.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   f.id = o.fastening\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    'Блок' as section,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    'Блок' as section,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   c.id = o.block_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    'Блок' as section,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_block\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_printer') as id,\n    o.id as order_id,\n    'Блок' as section,\n    11 as \"order\",\n    'Цветность' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   p.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_paper') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    8 as \"order\",\n    'Бумага' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       papers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_color') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    9 as \"order\",\n    'Цветность' as \"name\",\n    c.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       colors c\n  WHERE ot.id = o.type\n  AND   c.id = o.cover_color\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_departure_elements') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    10 as \"order\",\n    'Элементы на вылет' as \"name\",\n    (CASE\n      WHEN o.cover_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_printer') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    11 as \"order\",\n    'Цветность' as \"name\",\n    p.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       printers p\n  WHERE ot.id = o.type\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, '_cover_lamination') as id,\n    o.id as order_id,\n    ot.cover_name as section,\n    12 as \"order\",\n    'Цветность' as \"name\",\n    cl.name as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o,\n       order_types ot,\n       cover_laminations cl\n  WHERE ot.id = o.type\n  AND   cl.id = o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    100 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    101 as \"order\",\n    'Подготовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    102 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2)) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2))*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_risograph_print_work') as id,\n    o.id as order_id,\n    'Работы' as section,\n    103 as \"order\",\n    'Печать ризограф' as \"name\",\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc\n  WHERE dg.name = 2\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n  AND   occ.id = o.id\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehmzblj0",
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
    "id": "586yhtpu",
    "name": "section",
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
    "id": "gudrhwxj",
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
    "id": "rs2ilrti",
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
    "id": "pwus8saf",
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
    "id": "tuzxz7v2",
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
    "id": "andnasyl",
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
    "id": "ywgznf8q",
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
  collection.schema.removeField("lu1hklne")

  // remove
  collection.schema.removeField("jbae2uye")

  // remove
  collection.schema.removeField("eewoihob")

  // remove
  collection.schema.removeField("zba6eyup")

  // remove
  collection.schema.removeField("6ezua3yj")

  // remove
  collection.schema.removeField("te8vgfwc")

  // remove
  collection.schema.removeField("gd1fi1rk")

  // remove
  collection.schema.removeField("tcyozmoy")

  return dao.saveCollection(collection)
})
