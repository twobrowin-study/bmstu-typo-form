/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Заказ\n  SELECT\n    rfo.id,\n    rfo.order_id,\n    rfo.section_id,\n    rfo.\"order\",\n    rfo.\"name\",\n    rfo.\"value\",\n    rfo.units,\n    rfo.rate,\n    rfo.cost\n  FROM orders o,\n       report_fields_orders rfo\n  WHERE rfo.order_id = o.id\n\n  UNION\n\n  -- Выходные данные\n  SELECT\n    rfc.id,\n    rfc.order_id,\n    rfc.section_id,\n    rfc.\"order\",\n    rfc.\"name\",\n    rfc.\"value\",\n    rfc.units,\n    rfc.rate,\n    rfc.cost\n  FROM orders o,\n       report_fields_calcs rfc\n  WHERE rfc.order_id = o.id\n\n  UNION\n\n  -- Работы: листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Контроль качества: листовая продукция\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    round(0.1 * sum(rfwsp.cost), 1) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Работы: Блок\n  SELECT\n    rfwbp.id,\n    rfwbp.order_id,\n    rfwbp.section_id,\n    rfwbp.\"order\",\n    rfwbp.\"name\",\n    rfwbp.\"value\",\n    rfwbp.units,\n    rfwbp.rate,\n    rfwbp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_block_production rfwbp\n  WHERE rfwbp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Блок'\n\n  UNION\n\n  -- Контроль качества: Блок\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    round(0.1 * sum(rfwbp.cost), 1) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_block_production rfwbp\n  WHERE rfwbp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Блок'\n)\n"
  }

  // remove
  collection.schema.removeField("hazdbopp")

  // remove
  collection.schema.removeField("x1gwjynj")

  // remove
  collection.schema.removeField("kwul9phh")

  // remove
  collection.schema.removeField("uhim2olc")

  // remove
  collection.schema.removeField("slexa2jc")

  // remove
  collection.schema.removeField("42ntgsvh")

  // remove
  collection.schema.removeField("khzky8vy")

  // remove
  collection.schema.removeField("r7wqbcpp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3z5kxmgi",
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
    "id": "c7lblwur",
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
    "id": "h1ohtbha",
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
    "id": "uuzwyivb",
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
    "id": "wqfzm2pb",
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
    "id": "6batwtlj",
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
    "id": "l8xufzww",
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
    "id": "esoxk0z5",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Заказ\n  SELECT\n    rfo.id,\n    rfo.order_id,\n    rfo.section_id,\n    rfo.\"order\",\n    rfo.\"name\",\n    rfo.\"value\",\n    rfo.units,\n    rfo.rate,\n    rfo.cost\n  FROM orders o,\n       report_fields_orders rfo\n  WHERE rfo.order_id = o.id\n\n  UNION\n\n  -- Выходные данные\n  SELECT\n    rfc.id,\n    rfc.order_id,\n    rfc.section_id,\n    rfc.\"order\",\n    rfc.\"name\",\n    rfc.\"value\",\n    rfc.units,\n    rfc.rate,\n    rfc.cost\n  FROM orders o,\n       report_fields_calcs rfc\n  WHERE rfc.order_id = o.id\n\n  UNION\n\n  -- Работы листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Контроль качества листовая продукция\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    round(0.1 * sum(rfwsp.cost), 1) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hazdbopp",
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
    "id": "x1gwjynj",
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
    "id": "kwul9phh",
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
    "id": "uhim2olc",
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
    "id": "slexa2jc",
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
    "id": "42ntgsvh",
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
    "id": "khzky8vy",
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
    "id": "r7wqbcpp",
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
  collection.schema.removeField("3z5kxmgi")

  // remove
  collection.schema.removeField("c7lblwur")

  // remove
  collection.schema.removeField("h1ohtbha")

  // remove
  collection.schema.removeField("uuzwyivb")

  // remove
  collection.schema.removeField("wqfzm2pb")

  // remove
  collection.schema.removeField("6batwtlj")

  // remove
  collection.schema.removeField("l8xufzww")

  // remove
  collection.schema.removeField("esoxk0z5")

  return dao.saveCollection(collection)
})
