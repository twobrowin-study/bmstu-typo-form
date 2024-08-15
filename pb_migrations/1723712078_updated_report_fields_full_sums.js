/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eu67aksjxory34z")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    rfs.id,\n    rfs.order_id,\n    rfs.section_id,\n    rfs.\"order\",\n    rfs.\"name\",\n    rfs.\"value\",\n    rfs.units,\n    rfs.rate,\n    rfs.cost\n  FROM report_fields_sum rfs\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling((rfs.cost*1.0)/oec.estimated_circulation) as cost\n  FROM orders o,\n       report_fields_sum rfs,\n       orders_estimated_circulation oec\n  WHERE rfs.order_id = o.id\n  AND   oec.id = o.id\n)\n"
  }

  // remove
  collection.schema.removeField("mnpcqcgu")

  // remove
  collection.schema.removeField("yz2mdkti")

  // remove
  collection.schema.removeField("o9oxqv4z")

  // remove
  collection.schema.removeField("jaguxumm")

  // remove
  collection.schema.removeField("vmrgwfhn")

  // remove
  collection.schema.removeField("jpj0y7bs")

  // remove
  collection.schema.removeField("g3appdja")

  // remove
  collection.schema.removeField("jwsqpkdp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ld1vedxu",
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
    "id": "mmhgobz9",
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
    "id": "ocmsiaoo",
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
    "id": "gcmxsdgr",
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
    "id": "ptvobv98",
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
    "id": "tevhmbn2",
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
    "id": "rehjzv34",
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
    "id": "6rjzzqxd",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Общая сумма\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    400 as \"order\",\n    'Общая стоимость' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    rms.cost + rws.cost*7 as cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms,\n       report_works_sum rws\n  WHERE rms.order_id = o.id\n  AND   rws.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(((rms.cost + rws.cost*7)*1.0)/oec.estimated_circulation) as cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms,\n       report_works_sum rws,\n       orders_estimated_circulation oec\n  WHERE rms.order_id = o.id\n  AND   rws.order_id = o.id\n  AND   oec.id = o.id\n  AND   ot.id = o.type\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mnpcqcgu",
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
    "id": "yz2mdkti",
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
    "id": "o9oxqv4z",
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
    "id": "jaguxumm",
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
    "id": "vmrgwfhn",
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
    "id": "jpj0y7bs",
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
    "id": "g3appdja",
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
    "id": "jwsqpkdp",
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
  collection.schema.removeField("ld1vedxu")

  // remove
  collection.schema.removeField("mmhgobz9")

  // remove
  collection.schema.removeField("ocmsiaoo")

  // remove
  collection.schema.removeField("gcmxsdgr")

  // remove
  collection.schema.removeField("ptvobv98")

  // remove
  collection.schema.removeField("tevhmbn2")

  // remove
  collection.schema.removeField("rehjzv34")

  // remove
  collection.schema.removeField("6rjzzqxd")

  return dao.saveCollection(collection)
})
