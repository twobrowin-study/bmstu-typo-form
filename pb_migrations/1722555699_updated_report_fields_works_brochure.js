/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u5i8aeh59jcor55")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.page_num*oec.estimated_circulation*0.0000005)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_file_prepare_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n  )\n\n  UNION\n\n  -- Вывод форм офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*obc.block_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Вывод форм блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги на блок\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+(obc.block_product_column_height/100.0)*obp.block_multiplicity*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      203 as \"order\",\n      concat('Заготовка бумаги на блок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*ocp.cover_multiplicity*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Заготовка бумаги на обложку ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать ризограф блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0 + obc.block_print_full_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_block_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      220 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать ризограф обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0 + occ.cover_print_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_cover_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      221 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать цифра блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0 + obc.block_full_sheets/p.speed, 2)\n          ELSE round(6/60.0 + obc.block_print_full_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p,\n           papers pp\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n      AND   pp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      222 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать цифра обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0 + occ.cover_sheets/p.speed, 2)\n          ELSE round(6/60.0 + occ.cover_print_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p,\n           papers pp\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_cover_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      223 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((c.ofset_machine_time_minutes+(obc.block_print_full_sheets*c.ofset_machine_charges_times)/(obp.block_multiplicity*p.speed)+c.ofset_wash_minutes+c.ofset_makeready_parts_num*30)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_processed obp,\n           orders_block_calc obc,\n           printers p,\n           colors c\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n      AND   p.id = o.block_printer\n      AND   c.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      225 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать офсет обложка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((c.ofset_machine_time_minutes+(oec.estimated_circulation*c.ofset_machine_charges_times)/(ocp.cover_multiplicity*p.speed)+c.ofset_wash_minutes+c.ofset_makeready_parts_num*30)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           printers p,\n           colors c\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   p.id = o.cover_printer\n      AND   c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      225 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      226 as \"order\",\n      concat('Сушка блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      '' as rate,\n      '' as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      227 as \"order\",\n      concat('Сушка обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      '' as rate,\n      '' as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Резка листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+(obc.block_product_column_height/100.0)*obp.block_multiplicity*3)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      236 as \"order\",\n      'Резка листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Резка листов обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*ocp.cover_multiplicity*3)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      237 as \"order\",\n      'Резка листов обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Подборка блока на скобу\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((\n          20 + \n          (o.page_num/(\n              bc.print_side_num * 2 -- Учёт набора тетрадки\n          ) + 1)*1.5*ceiling((oec.estimated_circulation*bp.thickness)/50.0)+(oec.estimated_circulation/45)\n        )/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc,\n           papers bp\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_selection_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      238 as \"order\",\n      'Подборка со скреплением на скобу' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n    AND   f.id = o.fastening\n    AND   f.is_brace\n  )\n\n  UNION\n\n  -- Комплектовка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + floor(o.page_num/(bc.print_side_num*20))*oec.estimated_circulation*0.1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      239 as \"order\",\n      'Комплектовка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/ocp.lamintaion_work_speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Ламинация обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Скрепление на клей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/400)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на клей' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Скрепление на полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/150)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на полиуритан' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_polyurethane\n  )\n\n  UNION\n\n  -- Скрепление на пастиковую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на пастиковую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_plastic_spring\n  )\n\n  UNION\n\n  -- Скрепление на металлическую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на металлическую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_metal_spring\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(obc.block_product_column_height/100)*0.36)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      250 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   NOT f.is_brace\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/200)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n)"
  }

  // remove
  collection.schema.removeField("wwc8mcdy")

  // remove
  collection.schema.removeField("nekmr4xh")

  // remove
  collection.schema.removeField("izuerhze")

  // remove
  collection.schema.removeField("edts3zow")

  // remove
  collection.schema.removeField("yqpcu5co")

  // remove
  collection.schema.removeField("l510vzyd")

  // remove
  collection.schema.removeField("iaq5h6dy")

  // remove
  collection.schema.removeField("hrfyobpn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "prmh7mpf",
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
    "id": "d7cjlwsm",
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
    "id": "9g0n3le5",
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
    "id": "iwr0s88x",
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
    "id": "1dfitxex",
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
    "id": "jdvgz6nz",
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
    "id": "kkyfjxst",
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
    "id": "ajllgico",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Подготовка файлов\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((21 + o.page_num*oec.estimated_circulation*0.0000005)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_file_prepare_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      200 as \"order\",\n      'Подготовка файлов' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n  )\n\n  UNION\n\n  -- Вывод форм офсет блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*obc.block_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      201 as \"order\",\n      concat('Вывод форм блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Вывод форм офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((15 + 4*occ.cover_ofset_forms)/60.0, 2) as \"value\"\n      FROM orders o,\n          orders_cover_calc occ\n      WHERE occ.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_form_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      202 as \"order\",\n      concat('Вывод форм обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги на блок\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+(obc.block_product_column_height/100.0)*obp.block_multiplicity*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      203 as \"order\",\n      concat('Заготовка бумаги на блок ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Заготовка бумаги офсет обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*ocp.cover_multiplicity*2)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_paper_prepare') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      204 as \"order\",\n      concat('Заготовка бумаги на обложку ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Печать ризограф блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0 + obc.block_print_full_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_block_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      220 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать ризограф обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(6/60.0 + occ.cover_print_sheets/p.speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_cover_risograph_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      221 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n\n  UNION\n\n  -- Печать цифра блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0 + obc.block_full_sheets/p.speed, 2)\n          ELSE round(6/60.0 + obc.block_print_full_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           printers p,\n           papers pp\n      WHERE obc.id = o.id\n      AND   p.id = o.block_printer\n      AND   pp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      222 as \"order\",\n      concat('Печать блока ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать цифра обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN pp.thickness < 0.120 THEN round(6/60.0 + occ.cover_sheets/p.speed, 2)\n          ELSE round(6/60.0 + occ.cover_print_sheets/p.speed, 2)\n        END) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           printers p,\n           papers pp\n      WHERE occ.id = o.id\n      AND   p.id = o.cover_printer\n      AND   pp.id = o.cover_paper\n    )\n    SELECT\n      concat(o.id, '_cover_digital_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      223 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Печать офсет обложка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((c.ofset_machine_time_minutes+(oec.estimated_circulation*c.ofset_machine_charges_times)/(ocp.cover_multiplicity*p.speed)+c.ofset_wash_minutes+c.ofset_makeready_parts_num*30)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_cover_processed ocp,\n           printers p,\n           colors c\n      WHERE oec.id = o.id\n      AND   ocp.id = o.id\n      AND   p.id = o.cover_printer\n      AND   c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_print_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      225 as \"order\",\n      concat('Печать обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers p\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Сушка офсет\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(c.ofset_drying_minutes/60.0, 2) as \"value\"\n      FROM orders o,\n           colors c\n      WHERE c.id = o.cover_color\n    )\n    SELECT\n      concat(o.id, '_cover_ofset_drying_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      227 as \"order\",\n      concat('Сушка обложки ', p.name) as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      '' as rate,\n      '' as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Резка листов блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+(obc.block_product_column_height/100.0)*obp.block_multiplicity*3)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           orders_block_processed obp\n      WHERE obc.id = o.id\n      AND   obp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_block_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      236 as \"order\",\n      'Резка листов блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n  )\n\n  UNION\n\n  -- Резка листов обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((12+ceiling(occ.cover_product_column_height/100)*ocp.cover_multiplicity*3)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cover_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      237 as \"order\",\n      'Резка листов обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n  )\n\n  UNION\n\n  -- Подборка блока на скобу\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((\n          20 + \n          (o.page_num/(\n              bc.print_side_num * 2 -- Учёт набора тетрадки\n          ) + 1)*1.5*ceiling((oec.estimated_circulation*bp.thickness)/50.0)+(oec.estimated_circulation/45)\n        )/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc,\n           papers bp\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_paper\n    )\n    SELECT\n      concat(o.id, '_block_selection_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      238 as \"order\",\n      'Подборка со скреплением на скобу' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n    AND   f.id = o.fastening\n    AND   f.is_brace\n  )\n\n  UNION\n\n  -- Комплектовка блока\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6 + floor(o.page_num/(bc.print_side_num*20))*oec.estimated_circulation*0.1)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           colors bc\n      WHERE oec.id = o.id\n      AND   bc.id = o.block_color\n    )\n    SELECT\n      concat(o.id, '_block_assembly_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      239 as \"order\",\n      'Комплектовка блока' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        printers bp,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 1\n    AND   bp.id = o.block_printer\n    AND   (bp.is_ofset OR bp.is_risograph)\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n\n  UNION\n\n  -- Ламинация\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round(15/60.0 + occ.cover_sheets*cl.side_num/ocp.lamintaion_work_speed, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_cover_processed ocp,\n           cover_laminations cl\n      WHERE occ.id = o.id\n      AND   ocp.id = o.id\n      AND   cl.id = o.cover_lamination\n    )\n    SELECT\n      concat(o.id, '_lamination_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      240 as \"order\",\n      'Ламинация обложки' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   cl.id = o.cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Скрепление на клей\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/400)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на клей' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_hot_melt_adhesive\n  )\n\n  UNION\n\n  -- Скрепление на полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24+oec.estimated_circulation/150)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec\n      WHERE oec.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на полиуритан' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_polyurethane\n  )\n\n  UNION\n\n  -- Скрепление на пастиковую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на пастиковую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_plastic_spring\n  )\n\n  UNION\n\n  -- Скрепление на металлическую пружину\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((24 + ceiling((obc.block_sheets+1)/3.0)*oec.estimated_circulation*0.15)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_fastening_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      241 as \"order\",\n      'Скрепление на металлическую пружину' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   f.is_metal_spring\n  )\n\n  UNION\n\n  -- Резка готовой продукции\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling(obc.block_product_column_height/100)*0.36)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_block_calc obc\n      WHERE obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_cutting_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      250 as \"order\",\n      'Резка готовой продукции' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   dg.name = 2\n    AND   f.id = o.fastening\n    AND   NOT f.is_brace\n  )\n\n  UNION\n\n  -- Транспортировка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/500)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_transport_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Транспортировка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n\n  UNION\n\n  -- Упаковка\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        round((6+ceiling((obc.block_product_column_height+occ.cover_product_column_height)/200)*6)/60.0, 2) as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_package_work') as id,\n      o.id as order_id,\n      '000000007_works' as section_id,\n      251 as \"order\",\n      'Упаковка' as \"name\",\n      calc.\"value\" as \"value\",\n      'н/ч' as units,\n      dg.price as rate,\n      ceiling(calc.\"value\"*dg.price) as cost\n    FROM orders o,\n        calc,\n        difficulty_groups dg\n    WHERE calc.id = o.id\n    AND   dg.name = 3\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wwc8mcdy",
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
    "id": "nekmr4xh",
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
    "id": "izuerhze",
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
    "id": "edts3zow",
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
    "id": "yqpcu5co",
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
    "id": "l510vzyd",
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
    "id": "iaq5h6dy",
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
    "id": "hrfyobpn",
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
  collection.schema.removeField("prmh7mpf")

  // remove
  collection.schema.removeField("d7cjlwsm")

  // remove
  collection.schema.removeField("9g0n3le5")

  // remove
  collection.schema.removeField("iwr0s88x")

  // remove
  collection.schema.removeField("1dfitxex")

  // remove
  collection.schema.removeField("jdvgz6nz")

  // remove
  collection.schema.removeField("kkyfjxst")

  // remove
  collection.schema.removeField("ajllgico")

  return dao.saveCollection(collection)
})
