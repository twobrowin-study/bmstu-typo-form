/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iuqmq7we2bxxx1a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: блок\n  SELECT\n    concat(o.id, '_block_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    20 as \"order\",\n    'Изделий на лист: Блок' as \"name\",\n    obp.block_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Формат листа: блок\n  SELECT\n    concat(o.id, '_block_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    'Формат листа: Блок' as \"name\",\n    obp.block_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_lamintaion_work_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    32 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Требуется листов: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    concat('Листов: ', ot.cover_name) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Сторон печати: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    concat('Сторон печати: ', ot.cover_name) as \"name\",\n    occ.cover_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Высота столба: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    35 as \"order\",\n    concat('Высота столба: ', ot.cover_name) as \"name\",\n    occ.cover_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Форм офсета: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    36 as \"order\",\n    concat('Форм офсета: ', ot.cover_name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       printers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cp.is_ofset\n)\n"
  }

  // remove
  collection.schema.removeField("i1okwlki")

  // remove
  collection.schema.removeField("1pndqdbx")

  // remove
  collection.schema.removeField("wvptxe6c")

  // remove
  collection.schema.removeField("bqqrissg")

  // remove
  collection.schema.removeField("ws7tqwpd")

  // remove
  collection.schema.removeField("smdws5sm")

  // remove
  collection.schema.removeField("tux9yi5x")

  // remove
  collection.schema.removeField("vlndiueb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gy2dhq1e",
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
    "id": "e9i0zayo",
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
    "id": "zijlsskk",
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
    "id": "vdspkeyy",
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
    "id": "gilkqypu",
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
    "id": "ipl31uls",
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
    "id": "whmgagjm",
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
    "id": "cu15j5qt",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_lamintaion_work_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    32 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Требуется листов: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    concat('Листов: ', ot.cover_name) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Сторон печати: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    concat('Сторон печати: ', ot.cover_name) as \"name\",\n    occ.cover_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Высота столба: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    35 as \"order\",\n    concat('Высота столба: ', ot.cover_name) as \"name\",\n    occ.cover_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Форм офсета: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    36 as \"order\",\n    concat('Форм офсета: ', ot.cover_name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       printers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cp.is_ofset\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i1okwlki",
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
    "id": "1pndqdbx",
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
    "id": "wvptxe6c",
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
    "id": "bqqrissg",
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
    "id": "ws7tqwpd",
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
    "id": "smdws5sm",
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
    "id": "tux9yi5x",
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
    "id": "vlndiueb",
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
  collection.schema.removeField("gy2dhq1e")

  // remove
  collection.schema.removeField("e9i0zayo")

  // remove
  collection.schema.removeField("zijlsskk")

  // remove
  collection.schema.removeField("vdspkeyy")

  // remove
  collection.schema.removeField("gilkqypu")

  // remove
  collection.schema.removeField("ipl31uls")

  // remove
  collection.schema.removeField("whmgagjm")

  // remove
  collection.schema.removeField("cu15j5qt")

  return dao.saveCollection(collection)
})