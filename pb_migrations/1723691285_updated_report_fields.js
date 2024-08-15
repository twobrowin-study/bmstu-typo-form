/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jw0qgba656xmigh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Заказ\n  SELECT\n    rfo.id,\n    rfo.order_id,\n    rfo.section_id,\n    rfo.\"order\",\n    rfo.\"name\",\n    rfo.\"value\",\n    rfo.units,\n    rfo.rate,\n    rfo.cost\n  FROM orders o,\n       report_fields_orders rfo\n  WHERE rfo.order_id = o.id\n\n  UNION\n\n  -- Выходные данные\n  SELECT\n    rfc.id,\n    rfc.order_id,\n    rfc.section_id,\n    rfc.\"order\",\n    rfc.\"name\",\n    rfc.\"value\",\n    rfc.units,\n    rfc.rate,\n    rfc.cost\n  FROM orders o,\n       report_fields_calcs rfc\n  WHERE rfc.order_id = o.id\n  AND   o.show_calc\n\n  UNION\n\n  -- Материалы: листовая продукция\n  SELECT\n    rfmsp.id,\n    rfmsp.order_id,\n    rfmsp.section_id,\n    rfmsp.\"order\",\n    rfmsp.\"name\",\n    rfmsp.\"value\",\n    rfmsp.units,\n    rfmsp.rate,\n    rfmsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Материалы итого: Листовая продукция\n  SELECT\n    concat(o.id, '_summ') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    150 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfmsp.order_id\n\n  UNION\n\n  -- Материалы: брошюра\n  SELECT\n    rfmb.id,\n    rfmb.order_id,\n    rfmb.section_id,\n    rfmb.\"order\",\n    rfmb.\"name\",\n    rfmb.\"value\",\n    rfmb.units,\n    rfmb.rate,\n    rfmb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb\n  WHERE rfmb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Материалы итого: Брошюра\n  SELECT\n    concat(o.id, '_material_summ') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    150 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb\n  WHERE rfmb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfmb.order_id\n\n  UNION\n\n  -- Работы: листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Контроль качества: листовая продукция\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfwsp.order_id\n\n  UNION\n\n  -- Работы итого: Листовая продукция\n  SELECT\n    concat(o.id, '_material_summ') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    301 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfwsp.cost)*1.1) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfwsp.order_id\n\n  UNION\n\n  -- Работы: Брошюра\n  SELECT\n    rfwb.id,\n    rfwb.order_id,\n    rfwb.section_id,\n    rfwb.\"order\",\n    rfwb.\"name\",\n    rfwb.\"value\",\n    rfwb.units,\n    rfwb.rate,\n    rfwb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Контроль качества: Брошюра\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfwb.order_id\n\n  UNION\n\n  -- Работы итого: Брошюра\n  SELECT\n    concat(o.id, '_works_summ') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    301 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfwb.cost)*1.1) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfwb.order_id\n\n  -- UNION\n\n  -- -- Рентабельность: Листовая продукция\n  -- SELECT\n  --   concat(o.id, '_full_summ') as id,\n  --   o.id as order_id,\n  --   '00000008_profit' as section_id,\n  --   400 as \"order\",\n  --   'Рентабельность' as \"name\",\n  --   '' as \"value\",\n  --   '' as units,\n  --   '' as rate,\n  --   ceiling(sum(rfmsp.cost)+sum(rfwsp.cost)*1.1*7) as cost\n  -- FROM orders o,\n  --      order_types ot,\n  --      report_fields_materials_sheets_production rfmsp,\n  --      report_fields_works_sheets_production rfwsp\n  -- WHERE rfmsp.order_id = o.id\n  -- AND   rfwsp.order_id = o.id\n  -- AND   ot.id = o.type\n  -- AND   ot.name = 'Листовая продукция'\n  -- GROUP BY o.id\n\n  UNION\n\n  -- Рентабельность: Брошюра\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    400 as \"order\",\n    'Рентабельность' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb,\n       report_fields_works_brochure rfwb\n  WHERE rfmb.order_id = o.id\n  AND   rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY o.id\n)\n"
  }

  // remove
  collection.schema.removeField("kstawkbw")

  // remove
  collection.schema.removeField("6l7d2erl")

  // remove
  collection.schema.removeField("nsvsljg7")

  // remove
  collection.schema.removeField("0q65ezbe")

  // remove
  collection.schema.removeField("mbohcvhd")

  // remove
  collection.schema.removeField("lpdp2vzs")

  // remove
  collection.schema.removeField("cktlosvs")

  // remove
  collection.schema.removeField("h9jmnevd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "blrkukhh",
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
    "id": "ynlrvzio",
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
    "id": "3ag8rd2s",
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
    "id": "jtgyfiyr",
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
    "id": "klsklqwm",
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
    "id": "aixoaqae",
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
    "id": "cffcsvoj",
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
    "id": "mzvwwkss",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Заказ\n  SELECT\n    rfo.id,\n    rfo.order_id,\n    rfo.section_id,\n    rfo.\"order\",\n    rfo.\"name\",\n    rfo.\"value\",\n    rfo.units,\n    rfo.rate,\n    rfo.cost\n  FROM orders o,\n       report_fields_orders rfo\n  WHERE rfo.order_id = o.id\n\n  -- UNION\n\n  -- Выходные данные\n  -- SELECT\n  --   rfc.id,\n  --   rfc.order_id,\n  --   rfc.section_id,\n  --   rfc.\"order\",\n  --   rfc.\"name\",\n  --   rfc.\"value\",\n  --   rfc.units,\n  --   rfc.rate,\n  --   rfc.cost\n  -- FROM orders o,\n  --      report_fields_calcs rfc\n  -- WHERE rfc.order_id = o.id\n\n  UNION\n\n  -- Материалы: листовая продукция\n  SELECT\n    rfmsp.id,\n    rfmsp.order_id,\n    rfmsp.section_id,\n    rfmsp.\"order\",\n    rfmsp.\"name\",\n    rfmsp.\"value\",\n    rfmsp.units,\n    rfmsp.rate,\n    rfmsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Материалы итого: Листовая продукция\n  SELECT\n    concat(o.id, '_summ') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    150 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp\n  WHERE rfmsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfmsp.order_id\n\n  UNION\n\n  -- Материалы: брошюра\n  SELECT\n    rfmb.id,\n    rfmb.order_id,\n    rfmb.section_id,\n    rfmb.\"order\",\n    rfmb.\"name\",\n    rfmb.\"value\",\n    rfmb.units,\n    rfmb.rate,\n    rfmb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb\n  WHERE rfmb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Материалы итого: Брошюра\n  SELECT\n    concat(o.id, '_material_summ') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    150 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb\n  WHERE rfmb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfmb.order_id\n\n  UNION\n\n  -- Работы: листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Контроль качества: листовая продукция\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwsp.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfwsp.order_id\n\n  UNION\n\n  -- Работы итого: Листовая продукция\n  SELECT\n    concat(o.id, '_material_summ') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    301 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfwsp.cost)*1.1) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY rfwsp.order_id\n\n  UNION\n\n  -- Работы: Брошюра\n  SELECT\n    rfwb.id,\n    rfwb.order_id,\n    rfwb.section_id,\n    rfwb.\"order\",\n    rfwb.\"name\",\n    rfwb.\"value\",\n    rfwb.units,\n    rfwb.rate,\n    rfwb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Контроль качества: Брошюра\n  SELECT\n    concat(o.id, '_quality_control') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    300 as \"order\",\n    'Контроль качества' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(0.1 * sum(rfwb.cost)) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfwb.order_id\n\n  UNION\n\n  -- Работы итого: Брошюра\n  SELECT\n    concat(o.id, '_works_summ') as id,\n    o.id as order_id,\n    '000000007_works' as section_id,\n    301 as \"order\",\n    'Итого' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfwb.cost)*1.1) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY rfwb.order_id\n\n  UNION\n\n  -- Рентабельность: Листовая продукция\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    400 as \"order\",\n    'Рентабельность' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmsp.cost)+sum(rfwsp.cost)*1.1*7) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_sheets_production rfmsp,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfmsp.order_id = o.id\n  AND   rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n  GROUP BY o.id\n\n  UNION\n\n  -- Рентабельность: Брошюра\n  SELECT\n    concat(o.id, '_full_summ') as id,\n    o.id as order_id,\n    '00000008_profit' as section_id,\n    400 as \"order\",\n    'Рентабельность' as \"name\",\n    '' as \"value\",\n    '' as units,\n    '' as rate,\n    ceiling(sum(rfmb.cost)+sum(rfwb.cost)*1.1*7) as cost\n  FROM orders o,\n       order_types ot,\n       report_fields_materials_brochure rfmb,\n       report_fields_works_brochure rfwb\n  WHERE rfmb.order_id = o.id\n  AND   rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n  GROUP BY o.id\n  \n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kstawkbw",
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
    "id": "6l7d2erl",
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
    "id": "nsvsljg7",
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
    "id": "0q65ezbe",
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
    "id": "mbohcvhd",
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
    "id": "lpdp2vzs",
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
    "id": "cktlosvs",
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
    "id": "h9jmnevd",
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
  collection.schema.removeField("blrkukhh")

  // remove
  collection.schema.removeField("ynlrvzio")

  // remove
  collection.schema.removeField("3ag8rd2s")

  // remove
  collection.schema.removeField("jtgyfiyr")

  // remove
  collection.schema.removeField("klsklqwm")

  // remove
  collection.schema.removeField("aixoaqae")

  // remove
  collection.schema.removeField("cffcsvoj")

  // remove
  collection.schema.removeField("mzvwwkss")

  return dao.saveCollection(collection)
})
