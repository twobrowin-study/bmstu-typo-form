/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eu67aksjxory34z")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    rfs.id,\n    rfs.order_id,\n    rfs.section_id,\n    rfs.\"order\",\n    rfs.\"name\",\n    rfs.\"value\",\n    rfs.units,\n    rfs.rate,\n    rfs.cost\n  FROM report_fields_sum rfs\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(rfs.order_id, '_instance_price') as id,\n    rfs.order_id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    rfs.cost/oec.estimated_circulation as cost\n  FROM report_fields_sum rfs,\n       orders_estimated_circulation oec\n  WHERE oec.id = rfs.order_id\n)\n"
  }

  // remove
  collection.schema.removeField("syo5z8rv")

  // remove
  collection.schema.removeField("fewcmrv2")

  // remove
  collection.schema.removeField("n4leefor")

  // remove
  collection.schema.removeField("0mkxwaya")

  // remove
  collection.schema.removeField("z6mga8em")

  // remove
  collection.schema.removeField("7uou9rbk")

  // remove
  collection.schema.removeField("awrytrzw")

  // remove
  collection.schema.removeField("zmhohlyj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4udlumrx",
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
    "id": "nf5mw6vr",
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
    "id": "oyswrlmn",
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
    "id": "omvcre4v",
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
    "id": "9wqzvqzr",
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
    "id": "zds1w0vq",
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
    "id": "9wzzehop",
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
    "id": "qdlyextp",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    rfs.id,\n    rfs.order_id,\n    rfs.section_id,\n    rfs.\"order\",\n    rfs.\"name\",\n    rfs.\"value\",\n    rfs.units,\n    rfs.rate,\n    rfs.cost\n  FROM report_fields_sum rfs\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(rfs.order_id, '_instance_price') as id,\n    rfs.order_id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling((rfs.cost*1.0)/oec.estimated_circulation) as cost\n  FROM report_fields_sum rfs,\n       orders_estimated_circulation oec\n  WHERE oec.id = rfs.order_id\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "syo5z8rv",
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
    "id": "fewcmrv2",
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
    "id": "n4leefor",
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
    "id": "0mkxwaya",
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
    "id": "z6mga8em",
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
    "id": "7uou9rbk",
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
    "id": "awrytrzw",
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
    "id": "zmhohlyj",
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
  collection.schema.removeField("4udlumrx")

  // remove
  collection.schema.removeField("nf5mw6vr")

  // remove
  collection.schema.removeField("oyswrlmn")

  // remove
  collection.schema.removeField("omvcre4v")

  // remove
  collection.schema.removeField("9wqzvqzr")

  // remove
  collection.schema.removeField("zds1w0vq")

  // remove
  collection.schema.removeField("9wzzehop")

  // remove
  collection.schema.removeField("qdlyextp")

  return dao.saveCollection(collection)
})
