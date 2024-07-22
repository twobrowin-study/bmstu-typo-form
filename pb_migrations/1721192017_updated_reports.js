/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_title') as id,\n    o.id as order_id,\n    'Заказ' as section,\n    1 as \"order\",\n    'Название' as \"name\",\n    o.title as \"value\",\n    \"\" as units,\n    \"\" as rate,\n    \"\" as cost\n  FROM orders o\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    10 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    11 as \"order\",\n    'Подгтовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    12 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2)) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2))*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_risograph_print_work') as id,\n    o.id as order_id,\n    'Работы' as section,\n    13 as \"order\",\n    'Печать ризограф' as \"name\",\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc\n  WHERE dg.name = 2\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n  AND   occ.id = o.id\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n)\n"
  }

  // remove
  collection.schema.removeField("htdbtlzp")

  // remove
  collection.schema.removeField("axsdgdr3")

  // remove
  collection.schema.removeField("frm3s4oc")

  // remove
  collection.schema.removeField("kjldsbf8")

  // remove
  collection.schema.removeField("ex492z91")

  // remove
  collection.schema.removeField("g6lgydbk")

  // remove
  collection.schema.removeField("s60nxqmy")

  // remove
  collection.schema.removeField("3qw2ox4r")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    10 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    11 as \"order\",\n    'Подгтовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    12 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2)) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    (round((24+45*(occ.cover_ofset_forms+1))/60, 2))*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n\n  UNION\n\n  SELECT\n    concat(o.id, '_risograph_print_work') as id,\n    o.id as order_id,\n    'Работы' as section,\n    13 as \"order\",\n    'Печать ризограф' as \"name\",\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round(0.1+(oec.estimated_circulation*cc.print_side_num)/(ocp.cover_multiplicity*print_side_num), 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc\n  WHERE dg.name = 2\n  AND   p.id = o.cover_printer\n  AND   p.is_risograph\n  AND   occ.id = o.id\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "htdbtlzp",
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
    "id": "axsdgdr3",
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
    "id": "frm3s4oc",
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
    "id": "kjldsbf8",
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
    "id": "ex492z91",
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
    "id": "g6lgydbk",
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
    "id": "s60nxqmy",
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
    "id": "3qw2ox4r",
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

  return dao.saveCollection(collection)
})