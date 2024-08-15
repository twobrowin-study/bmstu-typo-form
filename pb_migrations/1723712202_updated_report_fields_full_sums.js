/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eu67aksjxory34z")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    rfs.id,\n    rfs.order_id,\n    rfs.section_id,\n    rfs.\"order\",\n    rfs.\"name\",\n    rfs.\"value\",\n    rfs.units,\n    rfs.rate,\n    rfs.cost\n  FROM report_fields_sum rfs\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(o.id, '_instance_price') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling((rfs.cost*1.0)/oec.estimated_circulation) as cost\n  FROM orders o,\n       report_fields_sum rfs,\n       orders_estimated_circulation oec\n  WHERE rfs.order_id = o.id\n  AND   oec.id = o.id\n)\n"
  }

  // remove
  collection.schema.removeField("5swfov7m")

  // remove
  collection.schema.removeField("ztmcfpho")

  // remove
  collection.schema.removeField("bkcmrazm")

  // remove
  collection.schema.removeField("kj4agcwr")

  // remove
  collection.schema.removeField("r52yn3bm")

  // remove
  collection.schema.removeField("bx6anj49")

  // remove
  collection.schema.removeField("orz48zv2")

  // remove
  collection.schema.removeField("zkgnlohr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u6wjakac",
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
    "id": "2yxzymnw",
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
    "id": "3s9sevgc",
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
    "id": "sotxjtlt",
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
    "id": "pg5ttgrr",
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
    "id": "kacdryum",
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
    "id": "p6t7sizq",
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
    "id": "ezg0mvkb",
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
  const collection = dao.findCollectionByNameOrId("eu67aksjxory34z")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    rfs.id,\n    rfs.order_id,\n    rfs.section_id,\n    rfs.\"order\",\n    rfs.\"name\",\n    rfs.\"value\",\n    rfs.units,\n    rfs.rate,\n    rfs.cost\n  FROM report_fields_sum rfs\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5swfov7m",
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
    "id": "ztmcfpho",
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
    "id": "bkcmrazm",
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
    "id": "kj4agcwr",
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
    "id": "r52yn3bm",
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
    "id": "bx6anj49",
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
    "id": "orz48zv2",
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
    "id": "zkgnlohr",
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
  collection.schema.removeField("u6wjakac")

  // remove
  collection.schema.removeField("2yxzymnw")

  // remove
  collection.schema.removeField("3s9sevgc")

  // remove
  collection.schema.removeField("sotxjtlt")

  // remove
  collection.schema.removeField("pg5ttgrr")

  // remove
  collection.schema.removeField("kacdryum")

  // remove
  collection.schema.removeField("p6t7sizq")

  // remove
  collection.schema.removeField("ezg0mvkb")

  return dao.saveCollection(collection)
})
