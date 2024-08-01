/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u5i8aeh59jcor55")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.page_num*oec.estimated_circulation*0.0000005)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_file_prepare_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n  )\n\n  UNION\n\n  -- Вывод форм офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*obc.block_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Вывод форм блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Резка листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + (obc.block_product_column_height/100.0)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      236 as \"order\",\n      'Резка листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Резка листов обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      237 as \"order\",\n      'Резка листов обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Подборка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + (o.page_num/(bc.print_side_num*20))*ceiling(oec.estimated_circulation*bp.thickness)/40)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc,\n           papers bp\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_selection_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      238 as \"order\",\n      'Подборка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Комплектовка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + floor(o.page_num/(bc.print_side_num*20))*oec.estimated_circulation*0.1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      239 as \"order\",\n      'Комплектовка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/ocp.lamintaion_work_speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Ламинация обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Скрепление на клей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/400)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на клей' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Скрепление на полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/150)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на полиуритан' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_polyurethane\n  )\n\n  UNION\n\n  -- Скрепление на скобу\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.16)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на скобу' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_brace\n  )\n\n  UNION\n\n  -- Скрепление на пастиковую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на пастиковую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_plastic_spring\n  )\n\n  UNION\n\n  -- Скрепление на металлическую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на металлическую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_metal_spring\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(obc.block_product_column_height/100)*0.36)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      250 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   NOT f.is_brace\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n)"
  }

  // remove
  collection.schema.removeField("mu2d9joj")

  // remove
  collection.schema.removeField("c4lcbmky")

  // remove
  collection.schema.removeField("a6y3z0hi")

  // remove
  collection.schema.removeField("k6rce5ld")

  // remove
  collection.schema.removeField("yhq9cxis")

  // remove
  collection.schema.removeField("uw4kpjgb")

  // remove
  collection.schema.removeField("le3ufm45")

  // remove
  collection.schema.removeField("amy9mtfj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m3kd6nxe",
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
    "id": "gvq4es9s",
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
    "id": "bd6lf3gp",
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
    "id": "bqnjhm8j",
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
    "id": "jbvex0un",
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
    "id": "au5bsp92",
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
    "id": "9xd7t1rj",
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
    "id": "ca4gprut",
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
  const collection = dao.findCollectionByNameOrId("u5i8aeh59jcor55")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.page_num*oec.estimated_circulation*0.0000005)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_file_prepare_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n  )\n\n  UNION\n\n  -- Вывод форм офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*obc.block_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Вывод форм блока', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм обложки', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Резка листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + (obc.block_product_column_height/100.0)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      236 as \"order\",\n      'Резка листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Резка листов обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*0.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      237 as \"order\",\n      'Резка листов обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Подборка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + (o.page_num/(bc.print_side_num*20))*ceiling(oec.estimated_circulation*bp.thickness)/40)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc,\n           papers bp\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_selection_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      238 as \"order\",\n      'Подборка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Комплектовка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + floor(o.page_num/(bc.print_side_num*20))*oec.estimated_circulation*0.1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      239 as \"order\",\n      'Комплектовка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/ocp.lamintaion_work_speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Ламинация обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Скрепление на клей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/400)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на клей' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Скрепление на полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/150)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на полиуритан' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_polyurethane\n  )\n\n  UNION\n\n  -- Скрепление на скобу\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+oec.estimated_circulation*0.16)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на скобу' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_brace\n  )\n\n  UNION\n\n  -- Скрепление на пастиковую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на пастиковую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_plastic_spring\n  )\n\n  UNION\n\n  -- Скрепление на металлическую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на металлическую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_metal_spring\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(obc.block_product_column_height/100)*0.36)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      250 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   NOT f.is_brace\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/200)*20)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mu2d9joj",
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
    "id": "c4lcbmky",
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
    "id": "a6y3z0hi",
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
    "id": "k6rce5ld",
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
    "id": "yhq9cxis",
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
    "id": "uw4kpjgb",
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
    "id": "le3ufm45",
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
    "id": "amy9mtfj",
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
  collection.schema.removeField("m3kd6nxe")

  // remove
  collection.schema.removeField("gvq4es9s")

  // remove
  collection.schema.removeField("bd6lf3gp")

  // remove
  collection.schema.removeField("bqnjhm8j")

  // remove
  collection.schema.removeField("jbvex0un")

  // remove
  collection.schema.removeField("au5bsp92")

  // remove
  collection.schema.removeField("9xd7t1rj")

  // remove
  collection.schema.removeField("ca4gprut")

  return dao.saveCollection(collection)
})
