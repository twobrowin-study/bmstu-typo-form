/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_created') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    0 as \"order\",\n    'Дата создания заказа' as \"name\",\n    o.created as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ext_order_num') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    2 as \"order\",\n    'Номер' as \"name\",\n    o.ext_order_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_circulation') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    3 as \"order\",\n    'Тираж' as \"name\",\n    o.circulation as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_format') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    4 as \"order\",\n    'Формат' as \"name\",\n    o.format as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_page_num') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    5 as \"order\",\n    'Количество страниц' as \"name\",\n    o.page_num as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_fastening') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    6 as \"order\",\n    'Вид крепления' as \"name\",\n    o.fastening as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_paper') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    7 as \"order\",\n    'Бумага на блок' as \"name\",\n    o.block_paper as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_color') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    8 as \"order\",\n    'Цветность блока' as \"name\",\n    o.block_color as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_block_departure_elements') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    9 as \"order\",\n    'Элементы на вылет блока' as \"name\",\n    (CASE\n      WHEN o.block_departure_elements THEN \"Да\"\n      ELSE \"Нет\"\n    END) as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    10 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    11 as \"order\",\n    'Подгтовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    12 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2)) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2))*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_risograph_print_work') as id,\n    o.id as order_id,\n    'Работы' as section,\n    13 as \"order\",\n    'Печать ризограф' as \"name\",\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc\n  WHERE dg.name = 2\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n  AND   occ.id = o.id\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n)\n"
  }

  // remove
  collection.schema.removeField("et0kbrpc")

  // remove
  collection.schema.removeField("eu5v71il")

  // remove
  collection.schema.removeField("iuunp5v6")

  // remove
  collection.schema.removeField("xixf5ctf")

  // remove
  collection.schema.removeField("kj127soo")

  // remove
  collection.schema.removeField("sbgocybw")

  // remove
  collection.schema.removeField("wjlggppk")

  // remove
  collection.schema.removeField("uirpqdi3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "553ejotb",
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
    "id": "ghtcqo3h",
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
    "id": "r44f5ya2",
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
    "id": "zeusbbqw",
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
    "id": "cmaudupv",
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
    "id": "mop9b6g6",
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
    "id": "iqj06a86",
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
    "id": "wqze0tkf",
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
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    10 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    11 as \"order\",\n    'Подгтовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    12 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2)) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2))*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_risograph_print_work') as id,\n    o.id as order_id,\n    'Работы' as section,\n    13 as \"order\",\n    'Печать ризограф' as \"name\",\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc\n  WHERE dg.name = 2\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n  AND   occ.id = o.id\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "et0kbrpc",
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
    "id": "eu5v71il",
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
    "id": "iuunp5v6",
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
    "id": "xixf5ctf",
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
    "id": "kj127soo",
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
    "id": "sbgocybw",
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
    "id": "wjlggppk",
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
    "id": "uirpqdi3",
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
  collection.schema.removeField("553ejotb")

  // remove
  collection.schema.removeField("ghtcqo3h")

  // remove
  collection.schema.removeField("r44f5ya2")

  // remove
  collection.schema.removeField("zeusbbqw")

  // remove
  collection.schema.removeField("cmaudupv")

  // remove
  collection.schema.removeField("mop9b6g6")

  // remove
  collection.schema.removeField("iqj06a86")

  // remove
  collection.schema.removeField("wqze0tkf")

  return dao.saveCollection(collection)
})
