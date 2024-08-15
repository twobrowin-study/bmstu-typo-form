/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eu67aksjxory34z")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    rfs.id,\n    rfs.order_id,\n    rfs.section_id,\n    rfs.\"order\",\n    rfs.\"name\",\n    rfs.\"value\",\n    rfs.units,\n    rfs.rate,\n    rfs.cost\n  FROM report_fields_sum rfs\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(rfs.order_id, '_instance_price') as id,\n    rfs.order_id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling((rfs.cost*1.0)/oec.estimated_circulation) as cost\n  FROM report_fields_sum rfs,\n       orders_estimated_circulation oec\n  WHERE oec.id = rfs.order_id\n)\n"
  }

  // remove
  collection.schema.removeField("2re7kjln")

  // remove
  collection.schema.removeField("kn8puxao")

  // remove
  collection.schema.removeField("78lehgly")

  // remove
  collection.schema.removeField("79gwdx9s")

  // remove
  collection.schema.removeField("hr8ctklk")

  // remove
  collection.schema.removeField("6nstm96r")

  // remove
  collection.schema.removeField("lfkiscl1")

  // remove
  collection.schema.removeField("ltpmaaeo")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eu67aksjxory34z")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    rfs.id,\n    rfs.order_id,\n    rfs.section_id,\n    rfs.\"order\",\n    rfs.\"name\",\n    rfs.\"value\",\n    rfs.units,\n    rfs.rate,\n    rfs.cost\n  FROM report_fields_sum rfs\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(rfs.order_id, '_instance_price') as id,\n    rfs.order_id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    rfs.cost as cost\n  FROM report_fields_sum rfs\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2re7kjln",
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
    "id": "kn8puxao",
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
    "id": "78lehgly",
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
    "id": "79gwdx9s",
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
    "id": "hr8ctklk",
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
    "id": "6nstm96r",
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
    "id": "lfkiscl1",
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
    "id": "ltpmaaeo",
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

  return dao.saveCollection(collection)
})
