/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    10 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    11 as \"order\",\n    'Подгтовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    12 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    ((24+45*(occ.cover_ofset_forms+1))/60) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    ((24+45*(occ.cover_ofset_forms+1))/60)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n)\n"
  }

  // remove
  collection.schema.removeField("y5qtnwsi")

  // remove
  collection.schema.removeField("tkuxufux")

  // remove
  collection.schema.removeField("qwqcvo2a")

  // remove
  collection.schema.removeField("eqzmwzqz")

  // remove
  collection.schema.removeField("jerfbdma")

  // remove
  collection.schema.removeField("mliseqwb")

  // remove
  collection.schema.removeField("mn4g4gmn")

  // remove
  collection.schema.removeField("bijx0zxh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atqsbxxi",
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
    "id": "ul6yz7lf",
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
    "id": "z7bcgbao",
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
    "id": "bbkgng3j",
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
    "id": "ccynbtlp",
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
    "id": "tkji35or",
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
    "id": "9le6bc0w",
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
    "id": "norvhm10",
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
    "query": "SELECT\n  id,\n  order_id,\n  section,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  SELECT\n    concat(o.id, '_file_prepare_cover') as id,\n    o.id as order_id,\n    'Работы' as section,\n    10 as \"order\",\n    'Подгтовка файлов' as \"name\",\n    round((21+o.circulation*0.0012)/60, 2) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    round((21+o.circulation*0.0012)/60, 2)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   NOT p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_file_prepare_cover_ofset') as id,\n    o.id as order_id,\n    'Работы' as section,\n    11 as \"order\",\n    'Подгтовка файлов офсет' as \"name\",\n    0.5 as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    0.5*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n\n  UNION\n\n  SELECT\n    concat(o.id, '_ofset_form_prepare') as id,\n    o.id as order_id,\n    'Работы' as section,\n    11 as \"order\",\n    'Вывод форм офсет' as \"name\",\n    ((24+45*(occ.cover_ofset_forms+1))/60) as \"value\",\n    'н/ч' as units,\n    dg.price as rate,\n    ((24+45*(occ.cover_ofset_forms+1))/60)*dg.price as cost\n  FROM orders o,\n      difficulty_groups dg,\n      printers p,\n      orders_cover_calc occ\n  WHERE dg.name = 1\n  AND   p.id = o.cover_printer\n  AND   p.is_ofset\n  AND   occ.id = o.id\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y5qtnwsi",
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
    "id": "tkuxufux",
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
    "id": "qwqcvo2a",
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
    "id": "eqzmwzqz",
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
    "id": "jerfbdma",
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
    "id": "mliseqwb",
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
    "id": "mn4g4gmn",
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
    "id": "bijx0zxh",
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
  collection.schema.removeField("atqsbxxi")

  // remove
  collection.schema.removeField("ul6yz7lf")

  // remove
  collection.schema.removeField("z7bcgbao")

  // remove
  collection.schema.removeField("bbkgng3j")

  // remove
  collection.schema.removeField("ccynbtlp")

  // remove
  collection.schema.removeField("tkji35or")

  // remove
  collection.schema.removeField("9le6bc0w")

  // remove
  collection.schema.removeField("norvhm10")

  return dao.saveCollection(collection)
})
