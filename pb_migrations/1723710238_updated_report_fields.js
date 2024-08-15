/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Заказ\n  SELECT\n    rfo.id,\n    rfo.order_id,\n    rfo.section_id,\n    rfo.\"order\",\n    rfo.\"name\",\n    rfo.\"value\",\n    rfo.units,\n    rfo.rate,\n    rfo.cost\n  FROM orders o,\n       report_fields_orders rfo\n  WHERE rfo.order_id = o.id\n\n  UNION\n\n  -- Выходные данные\n  SELECT\n    rfc.id,\n    rfc.order_id,\n    rfc.section_id,\n    rfc.\"order\",\n    rfc.\"name\",\n    rfc.\"value\",\n    rfc.units,\n    rfc.rate,\n    rfc.cost\n  FROM orders o,\n       report_fields_calcs rfc\n  WHERE rfc.order_id = o.id\n  AND   o.show_calc\n\n  UNION\n\n  -- Материалы: листовая продукция\n  SELECT\n    rfmsp.id,\n    rfmsp.order_id,\n    rfmsp.section_id,\n    rfmsp.\"order\",\n    rfmsp.\"name\",\n    rfmsp.\"value\",\n    rfmsp.units,\n    rfmsp.rate,\n    rfmsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Материалы: брошюра\n  SELECT\n    rfmb.id,\n    rfmb.order_id,\n    rfmb.section_id,\n    rfmb.\"order\",\n    rfmb.\"name\",\n    rfmb.\"value\",\n    rfmb.units,\n    rfmb.rate,\n    rfmb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb\n  WHERE rfmb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Материалы: итого\n  SELECT\n    rms.id,\n    rms.order_id,\n    rms.section_id,\n    rms.\"order\",\n    rms.\"name\",\n    rms.\"value\",\n    rms.units,\n    rms.rate,\n    rms.cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms\n  WHERE rms.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Работы: листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Работы: Брошюра\n  SELECT\n    rfwb.id,\n    rfwb.order_id,\n    rfwb.section_id,\n    rfwb.\"order\",\n    rfwb.\"name\",\n    rfwb.\"value\",\n    rfwb.units,\n    rfwb.rate,\n    rfwb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Работы: Котроль качества\n  SELECT\n    rfqc.id,\n    rfqc.order_id,\n    rfqc.section_id,\n    rfqc.\"order\",\n    rfqc.\"name\",\n    rfqc.\"value\",\n    rfqc.units,\n    rfqc.rate,\n    rfqc.cost\n  FROM orders o,\n       order_types ot,\n       report_works_quality_control rfqc\n  WHERE rfqc.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Работы: Итого\n  SELECT\n    rws.id,\n    rws.order_id,\n    rws.section_id,\n    rws.\"order\",\n    rws.\"name\",\n    rws.\"value\",\n    rws.units,\n    rws.rate,\n    rws.cost\n  FROM orders o,\n       order_types ot,\n       report_works_sum rws\n  WHERE rws.order_id = o.id\n  AND   ot.id = o.type\n\n  -- UNION\n\n  -- -- Общая сумма\n  -- SELECT\n  --   concat(o.id, '_full_summ') as id,\n  --   o.id as order_id,\n  --   '00000008_profit' as section_id,\n  --   400 as \"order\",\n  --   'Общая стоимость' as \"name\",\n  --   '' as \"value\",\n  --   '' as units,\n  --   '' as rate,\n  --   rms.cost + rws.cost*7 as cost\n  -- FROM orders o,\n  --      order_types ot,\n  --      report_materials_sum rms,\n  --      report_works_sum rws\n  -- WHERE rms.order_id = o.id\n  -- AND   rws.order_id = o.id\n  -- AND   ot.id = o.type\n\n  -- UNION\n\n  -- -- Цена экземпляра\n  -- SELECT\n  --   concat(o.id, '_full_summ') as id,\n  --   o.id as order_id,\n  --   '00000008_profit' as section_id,\n  --   401 as \"order\",\n  --   'Стоимость одного экземпляра' as \"name\",\n  --   '' as \"value\",\n  --   '' as units,\n  --   '' as rate,\n  --   ceiling(((rms.cost + rws.cost*7)*1.0)/oec.estimated_circulation) as cost\n  -- FROM orders o,\n  --      order_types ot,\n  --      report_materials_sum rms,\n  --      report_works_sum rws,\n  --      orders_estimated_circulation oec\n  -- WHERE rms.order_id = o.id\n  -- AND   rws.order_id = o.id\n  -- AND   oec.id = o.id\n  -- AND   ot.id = o.type\n)\n"
  }

  // remove
  collection.schema.removeField("w1lnizjf")

  // remove
  collection.schema.removeField("ku8u64sd")

  // remove
  collection.schema.removeField("wlivh1pd")

  // remove
  collection.schema.removeField("5f8u4zgb")

  // remove
  collection.schema.removeField("kvrcqewn")

  // remove
  collection.schema.removeField("e1vfiwfs")

  // remove
  collection.schema.removeField("wce3ymnl")

  // remove
  collection.schema.removeField("c0agjwvc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kgqcwfwk",
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
    "id": "udqlnw1a",
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
    "id": "ntphqgsu",
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
    "id": "khx2tsmt",
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
    "id": "qoyf48fd",
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
    "id": "gxmsi18s",
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
    "id": "dkgaungr",
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
    "id": "u3h7iign",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Заказ\n  SELECT\n    rfo.id,\n    rfo.order_id,\n    rfo.section_id,\n    rfo.\"order\",\n    rfo.\"name\",\n    rfo.\"value\",\n    rfo.units,\n    rfo.rate,\n    rfo.cost\n  FROM orders o,\n       report_fields_orders rfo\n  WHERE rfo.order_id = o.id\n\n  UNION\n\n  -- Выходные данные\n  SELECT\n    rfc.id,\n    rfc.order_id,\n    rfc.section_id,\n    rfc.\"order\",\n    rfc.\"name\",\n    rfc.\"value\",\n    rfc.units,\n    rfc.rate,\n    rfc.cost\n  FROM orders o,\n       report_fields_calcs rfc\n  WHERE rfc.order_id = o.id\n  AND   o.show_calc\n\n  UNION\n\n  -- Материалы: листовая продукция\n  SELECT\n    rfmsp.id,\n    rfmsp.order_id,\n    rfmsp.section_id,\n    rfmsp.\"order\",\n    rfmsp.\"name\",\n    rfmsp.\"value\",\n    rfmsp.units,\n    rfmsp.rate,\n    rfmsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Материалы: брошюра\n  SELECT\n    rfmb.id,\n    rfmb.order_id,\n    rfmb.section_id,\n    rfmb.\"order\",\n    rfmb.\"name\",\n    rfmb.\"value\",\n    rfmb.units,\n    rfmb.rate,\n    rfmb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb\n  WHERE rfmb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Материалы: итого\n  SELECT\n    rms.id,\n    rms.order_id,\n    rms.section_id,\n    rms.\"order\",\n    rms.\"name\",\n    rms.\"value\",\n    rms.units,\n    rms.rate,\n    rms.cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms\n  WHERE rms.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Работы: листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Работы: Брошюра\n  SELECT\n    rfwb.id,\n    rfwb.order_id,\n    rfwb.section_id,\n    rfwb.\"order\",\n    rfwb.\"name\",\n    rfwb.\"value\",\n    rfwb.units,\n    rfwb.rate,\n    rfwb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Работы: Котроль качества\n  SELECT\n    rfqc.id,\n    rfqc.order_id,\n    rfqc.section_id,\n    rfqc.\"order\",\n    rfqc.\"name\",\n    rfqc.\"value\",\n    rfqc.units,\n    rfqc.rate,\n    rfqc.cost\n  FROM orders o,\n       order_types ot,\n       report_works_quality_control rfqc\n  WHERE rfqc.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Работы: Итого\n  SELECT\n    rws.id,\n    rws.order_id,\n    rws.section_id,\n    rws.\"order\",\n    rws.\"name\",\n    rws.\"value\",\n    rws.units,\n    rws.rate,\n    rws.cost\n  FROM orders o,\n       order_types ot,\n       report_works_sum rws\n  WHERE rws.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Общая сумма\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    400 as \"order\",\n    'Общая стоимость' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    rms.cost + rws.cost*7 as cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms,\n       report_works_sum rws\n  WHERE rms.order_id = o.id\n  AND   rws.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Цена экземпляра\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    401 as \"order\",\n    'Стоимость одного экземпляра' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(((rms.cost + rws.cost*7)*1.0)/oec.estimated_circulation) as cost\n  FROM orders o,\n       order_types ot,\n       report_materials_sum rms,\n       report_works_sum rws,\n       orders_estimated_circulation oec\n  WHERE rms.order_id = o.id\n  AND   rws.order_id = o.id\n  AND   oec.id = o.id\n  AND   ot.id = o.type\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w1lnizjf",
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
    "id": "ku8u64sd",
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
    "id": "wlivh1pd",
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
    "id": "5f8u4zgb",
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
    "id": "kvrcqewn",
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
    "id": "e1vfiwfs",
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
    "id": "wce3ymnl",
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
    "id": "c0agjwvc",
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
  collection.schema.removeField("kgqcwfwk")

  // remove
  collection.schema.removeField("udqlnw1a")

  // remove
  collection.schema.removeField("ntphqgsu")

  // remove
  collection.schema.removeField("khx2tsmt")

  // remove
  collection.schema.removeField("qoyf48fd")

  // remove
  collection.schema.removeField("gxmsi18s")

  // remove
  collection.schema.removeField("dkgaungr")

  // remove
  collection.schema.removeField("u3h7iign")

  return dao.saveCollection(collection)
})
