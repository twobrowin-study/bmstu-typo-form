/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7izqe574n10kzpu")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Контроль качества: листовая продукция\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfwsp.order_id\n\n  UNION\n\n  -- Контроль качества: Брошюра\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfwb.order_id\n\n  UNION\n\n  -- Контроль качества: 7БЦ\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfw7.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_7bc rfw7\n  WHERE rfw7.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.is_7bc\n  GROUP BY rfw7.order_id\n)"
  }

  // remove
  collection.schema.removeField("8p4gv9kx")

  // remove
  collection.schema.removeField("ypf44i0r")

  // remove
  collection.schema.removeField("r8msp60u")

  // remove
  collection.schema.removeField("zocrafkb")

  // remove
  collection.schema.removeField("m1aluyf3")

  // remove
  collection.schema.removeField("9ganiypx")

  // remove
  collection.schema.removeField("amnovyyj")

  // remove
  collection.schema.removeField("g3ylh1aj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p7icput3",
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
    "id": "ol1mgozk",
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
    "id": "1r4jdmxr",
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
    "id": "jqhe4twr",
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
    "id": "cvjumfkw",
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
    "id": "njxyai7a",
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
    "id": "kqxhdczy",
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
    "id": "h47syujl",
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
  const collection = dao.findCollectionByNameOrId("7izqe574n10kzpu")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Контроль качества: листовая продукция\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfwsp.order_id\n\n  UNION\n\n  -- Контроль качества: Брошюра\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfwb.order_id\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8p4gv9kx",
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
    "id": "ypf44i0r",
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
    "id": "r8msp60u",
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
    "id": "zocrafkb",
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
    "id": "m1aluyf3",
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
    "id": "9ganiypx",
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
    "id": "amnovyyj",
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
    "id": "g3ylh1aj",
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
  collection.schema.removeField("p7icput3")

  // remove
  collection.schema.removeField("ol1mgozk")

  // remove
  collection.schema.removeField("1r4jdmxr")

  // remove
  collection.schema.removeField("jqhe4twr")

  // remove
  collection.schema.removeField("cvjumfkw")

  // remove
  collection.schema.removeField("njxyai7a")

  // remove
  collection.schema.removeField("kqxhdczy")

  // remove
  collection.schema.removeField("h47syujl")

  return dao.saveCollection(collection)
})
