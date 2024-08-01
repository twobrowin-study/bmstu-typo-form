/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iuqmq7we2bxxx1a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: блок\n  SELECT\n    concat(o.id, '_block_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    22 as \"order\",\n    'Изделий на лист: Блок' as \"name\",\n    obp.block_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Формат листа: блок\n  SELECT\n    concat(o.id, '_block_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    23 as \"order\",\n    'Формат листа: Блок' as \"name\",\n    obp.block_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Толщина листа: блок\n  SELECT\n    concat(o.id, '_block_sheet_thickness') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    24 as \"order\",\n    'Толщина листа: Блок' as \"name\",\n    bp.thickness as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers bp\n  WHERE ot.id = o.type\n  AND   bp.id = o.block_paper\n  AND   ot.has_block\n\n  UNION\n\n  -- Скорость печати принтера: блок\n  SELECT\n    concat(o.id, '_block_print_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    25 as \"order\",\n    concat('Скорость печати ', bpp.name,': Блок') as \"name\",\n    bpp.speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bpp.id = o.block_printer\n\n  UNION\n\n  -- Расход принтера: блок\n  SELECT\n    concat(o.id, '_block_print_outgo') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    26 as \"order\",\n    concat('Расход ', bpp.name,': Блок') as \"name\",\n    bpp.outgo as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bpp.id = o.block_printer\n  AND   NOT bpp.is_ofset\n\n  UNION\n\n  -- Требуется листов: блок\n  SELECT\n    concat(o.id, '_block_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    'Листов: Блок' as \"name\",\n    obc.block_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Сторон печати: блок\n  SELECT\n    concat(o.id, '_block_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    'Сторон печати: Блок' as \"name\",\n    obc.block_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Листов всего: блок\n  SELECT\n    concat(o.id, '_block_full_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    32 as \"order\",\n    'Листов всего: Блок' as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Сторон печати всего: блок\n  SELECT\n    concat(o.id, '_block_print_full_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    'Сторон печати всего: Блок' as \"name\",\n    obc.block_print_full_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Высота столба: блок\n  SELECT\n    concat(o.id, '_block_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    'Высота столба: Блок' as \"name\",\n    obc.block_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Форм офсета: блок\n  SELECT\n    concat(o.id, '_block_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    35 as \"order\",\n    'Форм офсета: Блок' as \"name\",\n    obc.block_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc,\n       printers bpp\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   bpp.id = o.block_printer\n  AND   bpp.is_ofset\n  AND   ot.has_block\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    50 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp,\n       papers cp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    51 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp,\n       papers cp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_lamintaion_work_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    52 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp,\n       papers cp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Толщина листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_block_sheet_thickness') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    53 as \"order\",\n    concat('Толщина листа: ', ot.cover_name) as \"name\",\n    cp.thickness as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers cp\n  WHERE ot.id = o.type\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Скорость печати принтера: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    54 as \"order\",\n    concat('Скорость печати ', cpp.name,': ', ot.cover_name) as \"name\",\n    cpp.speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers cp,\n       printers cpp\n  WHERE ot.id = o.type\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n  AND   cpp.id = o.cover_printer\n\n  UNION\n\n  -- Расход принтера: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_outgo') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    55 as \"order\",\n    concat('Расход ', cpp.name,': ', ot.cover_name) as \"name\",\n    cpp.outgo as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers cp,\n       printers cpp\n  WHERE ot.id = o.type\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n  AND   cpp.id = o.cover_printer\n  AND   NOT cpp.is_ofset\n\n  UNION\n\n  -- Требуется листов: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    60 as \"order\",\n    concat('Листов: ', ot.cover_name) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Сторон печати: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    61 as \"order\",\n    concat('Сторон печати: ', ot.cover_name) as \"name\",\n    occ.cover_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Высота столба: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    62 as \"order\",\n    concat('Высота столба: ', ot.cover_name) as \"name\",\n    occ.cover_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Форм офсета: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    63 as \"order\",\n    concat('Форм офсета: ', ot.cover_name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp,\n       printers cpp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n  AND   cpp.id = o.cover_printer\n  AND   cpp.is_ofset\n)\n"
  }

  // remove
  collection.schema.removeField("fjsuovwt")

  // remove
  collection.schema.removeField("adq5eca3")

  // remove
  collection.schema.removeField("inw4fzxk")

  // remove
  collection.schema.removeField("x0n000ml")

  // remove
  collection.schema.removeField("wtb6dbhc")

  // remove
  collection.schema.removeField("ixbp10nr")

  // remove
  collection.schema.removeField("pjnancgs")

  // remove
  collection.schema.removeField("icodmy3f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ekip2ygc",
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
    "id": "oc27ymar",
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
    "id": "m7ljuqhj",
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
    "id": "xdt9ng5b",
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
    "id": "kweo7hd7",
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
    "id": "wykvjdak",
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
    "id": "xsfe9nx9",
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
    "id": "pgem4ngd",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Расчётный тираж\n  SELECT\n    concat(o.id, '_estimated_circulation') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    21 as \"order\",\n    'Расчётный тираж' as \"name\",\n    oec.estimated_circulation as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_estimated_circulation oec\n  WHERE oec.id = o.id\n\n  UNION\n\n  -- Изделий на лист: блок\n  SELECT\n    concat(o.id, '_block_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    22 as \"order\",\n    'Изделий на лист: Блок' as \"name\",\n    obp.block_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Формат листа: блок\n  SELECT\n    concat(o.id, '_block_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    23 as \"order\",\n    'Формат листа: Блок' as \"name\",\n    obp.block_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_processed obp\n  WHERE ot.id = o.type\n  AND   obp.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Толщина листа: блок\n  SELECT\n    concat(o.id, '_block_sheet_thickness') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    24 as \"order\",\n    'Толщина листа: Блок' as \"name\",\n    bp.thickness as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers bp\n  WHERE ot.id = o.type\n  AND   bp.id = o.block_paper\n  AND   ot.has_block\n\n  UNION\n\n  -- Скорость печати принтера: блок\n  SELECT\n    concat(o.id, '_block_print_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    25 as \"order\",\n    concat('Скорость печати ', bpp.name,': Блок') as \"name\",\n    bpp.speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bpp.id = o.block_printer\n\n  UNION\n\n  -- Расход принтера: блок\n  SELECT\n    concat(o.id, '_block_print_outgo') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    26 as \"order\",\n    concat('Расход ', bpp.name,': Блок') as \"name\",\n    bpp.outgo as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       printers bpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bpp.id = o.block_printer\n  AND   NOT bpp.is_ofset\n\n  UNION\n\n  -- Требуется листов: блок\n  SELECT\n    concat(o.id, '_block_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    30 as \"order\",\n    'Листов: Блок' as \"name\",\n    obc.block_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Сторон печати: блок\n  SELECT\n    concat(o.id, '_block_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    31 as \"order\",\n    'Сторон печати: Блок' as \"name\",\n    obc.block_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Листов всего: блок\n  SELECT\n    concat(o.id, '_block_full_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    32 as \"order\",\n    'Листов всего: Блок' as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Высота столба: блок\n  SELECT\n    concat(o.id, '_block_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    33 as \"order\",\n    'Высота столба: Блок' as \"name\",\n    obc.block_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   ot.has_block\n\n  UNION\n\n  -- Форм офсета: блок\n  SELECT\n    concat(o.id, '_block_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    34 as \"order\",\n    'Форм офсета: Блок' as \"name\",\n    obc.block_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_block_calc obc,\n       printers bpp\n  WHERE ot.id = o.type\n  AND   obc.id = o.id\n  AND   bpp.id = o.block_printer\n  AND   bpp.is_ofset\n  AND   ot.has_block\n\n  UNION\n\n  -- Изделий на лист: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_multiplicity') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    50 as \"order\",\n    concat('Изделий на лист: ', ot.cover_name) as \"name\",\n    ocp.cover_multiplicity as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp,\n       papers cp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Формат листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_format') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    51 as \"order\",\n    concat('Формат листа: ', ot.cover_name) as \"name\",\n    ocp.cover_format as \"value\",\n    '' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp,\n       papers cp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Скорость ламинации: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_lamintaion_work_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    52 as \"order\",\n    concat('Скорость ламинации: ', ot.cover_name) as \"name\",\n    ocp.lamintaion_work_speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_processed ocp,\n       papers cp\n  WHERE ot.id = o.type\n  AND   ocp.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Толщина листа: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_block_sheet_thickness') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    53 as \"order\",\n    concat('Толщина листа: ', ot.cover_name) as \"name\",\n    cp.thickness as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers cp\n  WHERE ot.id = o.type\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Скорость печати принтера: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_speed') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    54 as \"order\",\n    concat('Скорость печати ', cpp.name,': ', ot.cover_name) as \"name\",\n    cpp.speed as \"value\",\n    '1/c' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers cp,\n       printers cpp\n  WHERE ot.id = o.type\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n  AND   cpp.id = o.cover_printer\n\n  UNION\n\n  -- Расход принтера: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_outgo') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    55 as \"order\",\n    concat('Расход ', cpp.name,': ', ot.cover_name) as \"name\",\n    cpp.outgo as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       papers cp,\n       printers cpp\n  WHERE ot.id = o.type\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n  AND   cpp.id = o.cover_printer\n  AND   NOT cpp.is_ofset\n\n  UNION\n\n  -- Требуется листов: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    60 as \"order\",\n    concat('Листов: ', ot.cover_name) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Сторон печати: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_print_sheets') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    61 as \"order\",\n    concat('Сторон печати: ', ot.cover_name) as \"name\",\n    occ.cover_print_sheets as \"value\",\n    'ед.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Высота столба: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_product_column_height') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    62 as \"order\",\n    concat('Высота столба: ', ot.cover_name) as \"name\",\n    occ.cover_product_column_height as \"value\",\n    'мм' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n\n  UNION\n\n  -- Форм офсета: обложка/листовая продукция\n  SELECT\n    concat(o.id, '_cover_ofset_forms') as id,\n    o.id as order_id,\n    '0000000005_calc' as section_id,\n    63 as \"order\",\n    concat('Форм офсета: ', ot.cover_name) as \"name\",\n    occ.cover_ofset_forms as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       order_types ot,\n       orders_cover_calc occ,\n       papers cp,\n       printers cpp\n  WHERE ot.id = o.type\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   NOT cp.is_empty\n  AND   cpp.id = o.cover_printer\n  AND   cpp.is_ofset\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjsuovwt",
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
    "id": "adq5eca3",
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
    "id": "inw4fzxk",
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
    "id": "x0n000ml",
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
    "id": "wtb6dbhc",
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
    "id": "ixbp10nr",
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
    "id": "pjnancgs",
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
    "id": "icodmy3f",
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
  collection.schema.removeField("ekip2ygc")

  // remove
  collection.schema.removeField("oc27ymar")

  // remove
  collection.schema.removeField("m7ljuqhj")

  // remove
  collection.schema.removeField("xdt9ng5b")

  // remove
  collection.schema.removeField("kweo7hd7")

  // remove
  collection.schema.removeField("wykvjdak")

  // remove
  collection.schema.removeField("xsfe9nx9")

  // remove
  collection.schema.removeField("pgem4ngd")

  return dao.saveCollection(collection)
})
