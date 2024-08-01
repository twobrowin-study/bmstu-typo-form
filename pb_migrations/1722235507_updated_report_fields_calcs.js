/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iuqmq7we2bxxx1a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_lamintaion_work_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    32 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Требуется листов: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    concat('Листов: ', ot.cover_name) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n)\n"
  }

  // remove
  collection.schema.removeField("sb5vim14")

  // remove
  collection.schema.removeField("t4npnejx")

  // remove
  collection.schema.removeField("xnkf1p9x")

  // remove
  collection.schema.removeField("lvq1whpq")

  // remove
  collection.schema.removeField("ihanijpw")

  // remove
  collection.schema.removeField("g0cbgrdu")

  // remove
  collection.schema.removeField("2rzmatsd")

  // remove
  collection.schema.removeField("o44uz5f2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bwyapuks",
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
    "id": "qdlu8ydt",
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
    "id": "wamt6e5c",
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
    "id": "vr8eqfyu",
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
    "id": "pnmnphkx",
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
    "id": "34mqhb4g",
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
    "id": "0zft41ck",
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
    "id": "wgycl0mf",
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
  const collection = dao.findCollectionByNameOrId("iuqmq7we2bxxx1a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sb5vim14",
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
    "id": "t4npnejx",
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
    "id": "xnkf1p9x",
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
    "id": "lvq1whpq",
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
    "id": "ihanijpw",
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
    "id": "g0cbgrdu",
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
    "id": "2rzmatsd",
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
    "id": "o44uz5f2",
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
  collection.schema.removeField("bwyapuks")

  // remove
  collection.schema.removeField("qdlu8ydt")

  // remove
  collection.schema.removeField("wamt6e5c")

  // remove
  collection.schema.removeField("vr8eqfyu")

  // remove
  collection.schema.removeField("pnmnphkx")

  // remove
  collection.schema.removeField("34mqhb4g")

  // remove
  collection.schema.removeField("0zft41ck")

  // remove
  collection.schema.removeField("wgycl0mf")

  return dao.saveCollection(collection)
})
