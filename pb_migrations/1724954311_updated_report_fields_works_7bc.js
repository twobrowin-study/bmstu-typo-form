/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q3i6drjyqij1wbz")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.page_num*oec.estimated_circulation*0.0000005)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_file_prepare_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n  )\n\n  UNION\n\n  -- Вывод форм офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*obc.block_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Вывод форм блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги на блок\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+(obc.block_product_column_height/100.0)*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      203 as \"order\",\n      concat('Заготовка бумаги на блок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Заготовка бумаги на обложку ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать ризограф блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + obc.block_print_full_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_block_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      220 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать ризограф обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_print_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_cover_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      221 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать цифра блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(15/60.0 + obc.block_full_sheets/p.speed, 2)\n          ELSE round(15/60.0 + obc.block_print_full_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p,\n           papers pp\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n      AND   pp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      222 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать цифра обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(15/60.0 + occ.cover_sheets/p.speed, 2)\n          ELSE round(15/60.0 + occ.cover_print_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p,\n           papers pp\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_cover_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      223 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + obc.block_print_sheets*c.ofset_machine_time_minutes + (obc.block_print_sheets*c.ofset_machine_charges_times*oec.estimated_circulation)/p.speed + c.ofset_drying_minutes)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_processed obp,\n           orders_block_calc obc,\n           printers p,\n           colors c,\n           orders_estimated_circulation oec\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n      AND   p.id = o.block_printer\n      AND   c.id = o.block_color\n      AND   oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      225 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать офсет обложка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + c.ofset_machine_time_minutes + (c.ofset_machine_charges_times*oec.estimated_circulation)/(ocp.cover_multiplicity*p.speed) + c.ofset_drying_minutes)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           printers p,\n           colors c\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   p.id = o.cover_printer\n      AND   c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      225 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      226 as \"order\",\n      concat('Сушка блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      '' as rate,\n      '' as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      227 as \"order\",\n      concat('Сушка обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      '' as rate,\n      '' as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Резка отпечатанных листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN obc.block_rounded_num_of_sheets_cut_screw_up > 1 THEN round((6 + ceiling(obc.block_sheets/obc.block_rounded_num_of_sheets_cut_screw_up)*obp.cut_time)/60.0, 2)\n          ELSE round((6 + ceiling(obc.block_sheet_height/100.0)*obc.block_sheets*obp.cut_time)/60.0, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      236 as \"order\",\n      'Резка отпечатанных листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp,\n        formats f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   f.id = o.format\n    AND   NOT bp.is_ofset\n  )\n\n  UNION\n\n  -- Резка листов обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*ocp.cover_multiplicity*3)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      237 as \"order\",\n      'Резка листов обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        orders_cover_processed ocp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   ocp.id = o.id\n    AND   ocp.cover_multiplicity > 1\n  )\n\n  UNION\n\n  -- Комплектовка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + floor(o.page_num/(bc.print_side_num*20))*oec.estimated_circulation*0.1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      239 as \"order\",\n      'Комплектовка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n    AND   NOT o.sewing\n  )\n\n  UNION\n\n  -- Фальцовка листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((30 + obc.block_full_sheets/3600 + obc.block_sheets*5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Фальцовка листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   bp.is_ofset\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Подборка блоков\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + ceiling(obc.block_full_sheets/8.0)/60.0)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Подборка блоков' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   bp.is_ofset\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Комплектовка блоков\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + (ceiling(obc.block_sheets/8.0)-1)*oec.estimated_circulation/10.0)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_estimated_circulation oec\n      WHERE obc.id = o.id\n      AND   oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      242 as \"order\",\n      'Комплектовка блоков' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   bp.is_ofset\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/(ocp.lamintaion_work_speed*1.0), 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Ламинация обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Скрепление на клей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24/60.0 + oec.estimated_circulation/400), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на клей' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15+ceiling(obc.block_product_column_height/100)*1.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      250 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   NOT f.is_brace\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/500)*4)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/200)*1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      252 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n)"
  }

  // remove
  collection.schema.removeField("qapdqz1r")

  // remove
  collection.schema.removeField("n0dl49rd")

  // remove
  collection.schema.removeField("mqzklohi")

  // remove
  collection.schema.removeField("cuf3ma4w")

  // remove
  collection.schema.removeField("1togpiwh")

  // remove
  collection.schema.removeField("vvuo4fub")

  // remove
  collection.schema.removeField("uqx1hoh7")

  // remove
  collection.schema.removeField("ijpyir4h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hywjv7zs",
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
    "id": "n1syyitf",
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
    "id": "guigovgx",
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
    "id": "c3frrtiw",
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
    "id": "s24wb9h9",
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
    "id": "adt0k329",
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
    "id": "on1zemoe",
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
    "id": "jticgv85",
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
  const collection = dao.findCollectionByNameOrId("q3i6drjyqij1wbz")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.page_num*oec.estimated_circulation*0.0000005)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_file_prepare_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n  )\n\n  UNION\n\n  -- Вывод форм офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*obc.block_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Вывод форм блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги на блок\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+(obc.block_product_column_height/100.0)*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      203 as \"order\",\n      concat('Заготовка бумаги на блок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Заготовка бумаги на обложку ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать ризограф блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + obc.block_print_full_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_block_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      220 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать ризограф обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_print_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_cover_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      221 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать цифра блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(15/60.0 + obc.block_full_sheets/p.speed, 2)\n          ELSE round(15/60.0 + obc.block_print_full_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p,\n           papers pp\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n      AND   pp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      222 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать цифра обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(15/60.0 + occ.cover_sheets/p.speed, 2)\n          ELSE round(15/60.0 + occ.cover_print_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p,\n           papers pp\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_cover_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      223 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + obc.block_print_sheets*c.ofset_machine_time_minutes + (obc.block_print_sheets*c.ofset_machine_charges_times*oec.estimated_circulation)/p.speed + c.ofset_drying_minutes)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_processed obp,\n           orders_block_calc obc,\n           printers p,\n           colors c,\n           orders_estimated_circulation oec\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n      AND   p.id = o.block_printer\n      AND   c.id = o.block_color\n      AND   oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      225 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать офсет обложка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + c.ofset_machine_time_minutes + (c.ofset_machine_charges_times*oec.estimated_circulation)/(ocp.cover_multiplicity*p.speed) + c.ofset_drying_minutes)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           printers p,\n           colors c\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   p.id = o.cover_printer\n      AND   c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      225 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      226 as \"order\",\n      concat('Сушка блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      '' as rate,\n      '' as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      227 as \"order\",\n      concat('Сушка обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      '' as rate,\n      '' as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Резка отпечатанных листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN obc.block_rounded_num_of_sheets_cut_screw_up > 1 THEN round((6 + ceiling(obc.block_sheets/obc.block_rounded_num_of_sheets_cut_screw_up)*obp.cut_time)/60.0, 2)\n          ELSE round((6 + ceiling(obc.block_sheet_height/100.0)*obc.block_sheets*obp.cut_time)/60.0, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      236 as \"order\",\n      'Резка отпечатанных листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp,\n        formats f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   f.id = o.format\n    AND   NOT bp.is_ofset\n  )\n\n  UNION\n\n  -- Резка листов обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*ocp.cover_multiplicity*3)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      237 as \"order\",\n      'Резка листов обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        orders_cover_processed ocp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   ocp.id = o.id\n    AND   ocp.cover_multiplicity > 1\n  )\n\n  UNION\n\n  -- Комплектовка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + floor(o.page_num/(bc.print_side_num*20))*oec.estimated_circulation*0.1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      239 as \"order\",\n      'Комплектовка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n    AND   NOT o.sewing\n  )\n\n  UNION\n\n  -- Фальцовка листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((30 + obc.block_full_sheets/3600 + obc.block_sheets*5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Фальцовка листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   bp.is_ofset\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Подборка блоков\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + ceiling(obc.block_full_sheets/8.0)/60.0)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Подборка блоков' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   bp.is_ofset\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Комплектовка блоков\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((20 + (ceiling(obc.block_sheets/8.0)-1)*oec.estimated_circulation/10.0)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_estimated_circulation oec\n      WHERE obc.id = o.id\n      AND   oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      242 as \"order\",\n      'Комплектовка блоков' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   bp.is_ofset\n    AND   o.sewing\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/(ocp.lamintaion_work_speed*1.0), 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Ламинация обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Скрепление на клей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24/60.0 + oec.estimated_circulation/400), 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на клей' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15+ceiling(obc.block_product_column_height/100)*1.5)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      250 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   NOT f.is_brace\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/500)*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/200)*1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      252 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qapdqz1r",
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
    "id": "n0dl49rd",
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
    "id": "mqzklohi",
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
    "id": "cuf3ma4w",
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
    "id": "1togpiwh",
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
    "id": "vvuo4fub",
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
    "id": "uqx1hoh7",
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
    "id": "ijpyir4h",
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
  collection.schema.removeField("hywjv7zs")

  // remove
  collection.schema.removeField("n1syyitf")

  // remove
  collection.schema.removeField("guigovgx")

  // remove
  collection.schema.removeField("c3frrtiw")

  // remove
  collection.schema.removeField("s24wb9h9")

  // remove
  collection.schema.removeField("adt0k329")

  // remove
  collection.schema.removeField("on1zemoe")

  // remove
  collection.schema.removeField("jticgv85")

  return dao.saveCollection(collection)
})
