/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("egvbqhsqs78d7ll")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.circulation*0.0012)/60.0, 2) as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   NOT p.is_ofset\n  )\n\n  UNION\n\n  -- Подготовка файлов офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        0.5 as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover_ofset') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Подготовка файлов ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0 + occ.cover_print_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      203 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать цифра\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0 + occ.cover_sheets/p.speed, 2)\n          ELSE round(6/60.0 + occ.cover_print_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p,\n           papers pp\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((c.ofset_machine_time_minutes+(oec.estimated_circulation*c.ofset_machine_charges_times)/(ocp.cover_multiplicity*p.speed)+c.ofset_wash_minutes+c.ofset_makeready_parts_num*30)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           printers p,\n           colors c\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   p.id = o.cover_printer\n      AND   c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      205 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/ocp.lamintaion_work_speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      206 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      207 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      208 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      209 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Фальцовка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.05)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_folding_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      210 as \"order\",\n      'Фальцовка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Биговка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.0072)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_creasing_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      211 as \"order\",\n      'Биговка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n)"
  }

  // remove
  collection.schema.removeField("7tzcl9np")

  // remove
  collection.schema.removeField("xepmhaqt")

  // remove
  collection.schema.removeField("ygumuoka")

  // remove
  collection.schema.removeField("scq2oqwv")

  // remove
  collection.schema.removeField("p882ezel")

  // remove
  collection.schema.removeField("xgu9r8fs")

  // remove
  collection.schema.removeField("qlzsejci")

  // remove
  collection.schema.removeField("f3ziu752")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xrcyszrx",
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
    "id": "ygiyj3x9",
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
    "id": "4tjwhtng",
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
    "id": "5mrgdsui",
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
    "id": "0brghb9h",
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
    "id": "njmu9dcu",
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
    "id": "jueqvvo1",
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
    "id": "iuu0sxqe",
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
  const collection = dao.findCollectionByNameOrId("egvbqhsqs78d7ll")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.circulation*0.0012)/60.0, 2) as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   NOT p.is_ofset\n  )\n\n  UNION\n\n  -- Подготовка файлов офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        0.5 as \"value\"\n      FROM orders o\n    )\n    SELECT\n      concat(o.id, '_file_prepare_cover_ofset') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Подготовка файлов ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0 + occ.cover_print_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      203 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать цифра\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0 + occ.cover_sheets/p.speed, 2)\n          ELSE round(6/60.0 + occ.cover_print_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p,\n           papers pp\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((c.ofset_machine_time_minutes+(oec.estimated_circulation*c.ofset_machine_charges_times)/(ocp.cover_multiplicity*p.speed)+c.ofset_wash_minutes+c.ofset_makeready_parts_num*30)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           printers p,\n           colors c\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   p.id = o.cover_printer\n      AND   c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Печать ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/ocp.lamintaion_work_speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      205 as \"order\",\n      'Ламинация' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      206 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      207 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(occ.cover_product_column_height/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      208 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Фальцовка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.05)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_folding_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      209 as \"order\",\n      'Фальцовка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Биговка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.0072)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_creasing_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      210 as \"order\",\n      'Биговка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7tzcl9np",
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
    "id": "xepmhaqt",
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
    "id": "ygumuoka",
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
    "id": "scq2oqwv",
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
    "id": "p882ezel",
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
    "id": "xgu9r8fs",
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
    "id": "qlzsejci",
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
    "id": "f3ziu752",
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
  collection.schema.removeField("xrcyszrx")

  // remove
  collection.schema.removeField("ygiyj3x9")

  // remove
  collection.schema.removeField("4tjwhtng")

  // remove
  collection.schema.removeField("5mrgdsui")

  // remove
  collection.schema.removeField("0brghb9h")

  // remove
  collection.schema.removeField("njmu9dcu")

  // remove
  collection.schema.removeField("jueqvvo1")

  // remove
  collection.schema.removeField("iuu0sxqe")

  return dao.saveCollection(collection)
})
