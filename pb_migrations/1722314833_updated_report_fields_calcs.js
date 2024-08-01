/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iuqmq7we2bxxx1a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: блок\n  SELECT\n    concat(o.id, '_block_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    22 as \"order\",\n    'Изделий на лист: Блок' as \"name\",\n    obp.block_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Формат листа: блок\n  SELECT\n    concat(o.id, '_block_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    23 as \"order\",\n    'Формат листа: Блок' as \"name\",\n    obp.block_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Требуется листов: блок\n  SELECT\n    concat(o.id, '_block_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    24 as \"order\",\n    'Листов: Блок' as \"name\",\n    obc.block_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Сторон печати: блок\n  SELECT\n    concat(o.id, '_block_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    25 as \"order\",\n    'Сторон печати: Блок' as \"name\",\n    obc.block_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Листов всего: блок\n  SELECT\n    concat(o.id, '_block_full_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    26 as \"order\",\n    'Листов всего: Блок' as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Высота столба: блок\n  SELECT\n    concat(o.id, '_block_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    27 as \"order\",\n    'Высота столба: Блок' as \"name\",\n    obc.block_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Форм офсета: блок\n  SELECT\n    concat(o.id, '_block_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    28 as \"order\",\n    'Форм офсета: Блок' as \"name\",\n    obc.block_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc,\n       printers cp\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   cp.id = o.block_printer\n  AND   cp.is_ofset\n  AND   ot.has_block\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_lamintaion_work_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    32 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Требуется листов: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    concat('Листов: ', ot.cover_name) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Сторон печати: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    concat('Сторон печати: ', ot.cover_name) as \"name\",\n    occ.cover_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Высота столба: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    35 as \"order\",\n    concat('Высота столба: ', ot.cover_name) as \"name\",\n    occ.cover_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Форм офсета: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    36 as \"order\",\n    concat('Форм офсета: ', ot.cover_name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       printers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cp.is_ofset\n)\n"
  }

  // remove
  collection.schema.removeField("n7zdtwj9")

  // remove
  collection.schema.removeField("aerzgxsr")

  // remove
  collection.schema.removeField("aquz5hm2")

  // remove
  collection.schema.removeField("jdc7gavm")

  // remove
  collection.schema.removeField("gj8kzj29")

  // remove
  collection.schema.removeField("vaq7yxqq")

  // remove
  collection.schema.removeField("8rktx1nb")

  // remove
  collection.schema.removeField("tho0i9qk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rl45jgwn",
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
    "id": "6spynlup",
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
    "id": "0zhb0jxd",
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
    "id": "xjbhtbt5",
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
    "id": "n4saklsz",
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
    "id": "3cfz3rge",
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
    "id": "rv5yvgr3",
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
    "id": "htqh4qv3",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: блок\n  SELECT\n    concat(o.id, '_block_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    22 as \"order\",\n    'Изделий на лист: Блок' as \"name\",\n    obp.block_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Формат листа: блок\n  SELECT\n    concat(o.id, '_block_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    23 as \"order\",\n    'Формат листа: Блок' as \"name\",\n    obp.block_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Требуется листов: блок\n  SELECT\n    concat(o.id, '_block_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    'Листов: Блок' as \"name\",\n    obc.block_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Сторон печати: блок\n  SELECT\n    concat(o.id, '_block_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    'Сторон печати: Блок' as \"name\",\n    obc.block_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Листов всего: блок\n  SELECT\n    concat(o.id, '_block_full_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    'Листов всего: Блок' as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Высота столба: блок\n  SELECT\n    concat(o.id, '_block_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    35 as \"order\",\n    'Высота столба: Блок' as \"name\",\n    obc.block_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Форм офсета: блок\n  SELECT\n    concat(o.id, '_block_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    36 as \"order\",\n    'Форм офсета: Блок' as \"name\",\n    obc.block_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc,\n       printers cp\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   cp.id = o.block_printer\n  AND   cp.is_ofset\n  AND   ot.has_block\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_lamintaion_work_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    32 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n\n  UNION\n\n  -- Требуется листов: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    concat('Листов: ', ot.cover_name) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Сторон печати: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    concat('Сторон печати: ', ot.cover_name) as \"name\",\n    occ.cover_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Высота столба: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    35 as \"order\",\n    concat('Высота столба: ', ot.cover_name) as \"name\",\n    occ.cover_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n\n  UNION\n\n  -- Форм офсета: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    36 as \"order\",\n    concat('Форм офсета: ', ot.cover_name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       printers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_printer\n  AND   cp.is_ofset\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n7zdtwj9",
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
    "id": "aerzgxsr",
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
    "id": "aquz5hm2",
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
    "id": "jdc7gavm",
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
    "id": "gj8kzj29",
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
    "id": "vaq7yxqq",
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
    "id": "8rktx1nb",
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
    "id": "tho0i9qk",
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
  collection.schema.removeField("rl45jgwn")

  // remove
  collection.schema.removeField("6spynlup")

  // remove
  collection.schema.removeField("0zhb0jxd")

  // remove
  collection.schema.removeField("xjbhtbt5")

  // remove
  collection.schema.removeField("n4saklsz")

  // remove
  collection.schema.removeField("3cfz3rge")

  // remove
  collection.schema.removeField("rv5yvgr3")

  // remove
  collection.schema.removeField("htqh4qv3")

  return dao.saveCollection(collection)
})
