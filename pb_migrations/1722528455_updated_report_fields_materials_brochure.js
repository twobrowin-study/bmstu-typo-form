/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqajfcxv56p9aoo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\"\n      FROM orders o,\n            orders_cover_calc occ,\n            orders_block_calc obc\n      WHERE occ.id = o.id\n      AND   obc.id = o.id\n    )\n    SELECT\n      concat(o.id, '_ofset_forms') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      'Количество форм офсета' as \"name\",\n      calc.\"value\" as \"value\",\n      'шт.' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n         calc,\n         printers p\n    WHERE calc.id = o.id\n    AND   p.is_ofset\n  )\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация обложки' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Пружины пластиквые\n  SELECT\n    concat(o.id, '_plastic_springs') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    121 as \"order\",\n    'Пружины пластиковые' as \"name\",\n    oec.estimated_circulation as \"value\",\n    'шт.' as units,\n    f.price as rate,\n    round(oec.estimated_circulation*f.price, 1) as cost\n  FROM orders o,\n       orders_estimated_circulation oec,\n       fastenings f\n  WHERE oec.id = o.id\n  AND   f.id = o.fastening\n  AND   f.is_plastic_spring\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_cover') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    122 as \"order\",\n    concat('Обложка прозрачная ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Подложка\n  SELECT\n    concat(o.id, '_transparent_backing') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    123 as \"order\",\n    concat('Подложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Термоклей и полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/350000 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      124 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      ceiling(calc.\"value\"*f.price) as cost\n    FROM orders o,\n        calc,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n)"
  }

  // remove
  collection.schema.removeField("k92ypvdl")

  // remove
  collection.schema.removeField("dx3cb7qn")

  // remove
  collection.schema.removeField("np7ttgxf")

  // remove
  collection.schema.removeField("iy8hal15")

  // remove
  collection.schema.removeField("egl3i61y")

  // remove
  collection.schema.removeField("sf7wjl2t")

  // remove
  collection.schema.removeField("vel9pflv")

  // remove
  collection.schema.removeField("g3n33g7a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aobbjd3u",
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
    "id": "lbkbmpzb",
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
    "id": "92ff3wck",
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
    "id": "tvpjzj8q",
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
    "id": "wtznyxur",
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
    "id": "5uxnpjwv",
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
    "id": "va7stb4p",
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
    "id": "lkxdpgmm",
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
  const collection = dao.findCollectionByNameOrId("wqajfcxv56p9aoo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n\n  UNION\n\n  -- Количество форм офсета\n  SELECT\n    concat(o.id, '_ofset_forms') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    102 as \"order\",\n    'Количество форм офсета' as \"name\",\n    ifnull(occ.cover_ofset_forms,0) + ifnull(obc.block_ofset_forms,0) as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n        orders_cover_calc occ,\n        orders_block_calc obc\n  WHERE occ.id = o.id\n  AND   obc.id = o.id\n\n  UNION\n\n  -- Ламинация обложки\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        clr.multiplier*occ.cover_sheets*cl.side_num*2.05 as \"value\",\n        clr.price as price\n      FROM orders o,\n           orders_cover_processed ocp,\n           orders_cover_calc occ,\n           cover_laminations cl,\n           cover_laminations_rules clr\n      WHERE ocp.id = o.id\n      AND   occ.id = o.id\n      AND   cl.id = o.cover_lamination\n      AND   clr.paper_format = ocp.cover_format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      120 as \"order\",\n      'Ламинация обложки' as \"name\",\n      round(calc.\"value\", 1) as \"value\",\n      'м' as units,\n      calc.price as rate,\n      ceiling(calc.\"value\"*calc.price) as cost\n    FROM orders o,\n        calc,\n        cover_laminations cl\n    WHERE calc.id = o.id\n    AND   cl.id = cover_lamination\n    AND   NOT cl.is_empty\n  )\n\n  UNION\n\n  -- Пружины пластиквые\n  SELECT\n    concat(o.id, '_plastic_springs') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    121 as \"order\",\n    'Пружины пластиковые' as \"name\",\n    oec.estimated_circulation as \"value\",\n    'шт.' as units,\n    f.price as rate,\n    round(oec.estimated_circulation*f.price, 1) as cost\n  FROM orders o,\n       orders_estimated_circulation oec,\n       fastenings f\n  WHERE oec.id = o.id\n  AND   f.id = o.fastening\n  AND   f.is_plastic_spring\n\n  UNION\n\n  -- Прозрачная обложка\n  SELECT\n    concat(o.id, '_transparent_cover') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    122 as \"order\",\n    concat('Обложка прозрачная ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Подложка\n  SELECT\n    concat(o.id, '_transparent_backing') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    123 as \"order\",\n    concat('Подложка ', ocp.transparent_elements_format) as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    '' as rate,\n    '' as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       fastenings f\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   f.id = o.fastening\n  AND   f.append_transparent_elements\n\n  UNION\n\n  -- Термоклей и полиуритан\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        f.larger_size_mm*obc.block_product_column_height*oec.estimated_circulation/350000 as \"value\"\n      FROM orders o,\n           orders_estimated_circulation oec,\n           orders_block_calc obc,\n           formats f\n      WHERE oec.id = o.id\n      AND   obc.id = o.id\n      AND   f.id = o.format\n    )\n    SELECT\n      concat(o.id, '_lamination_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      124 as \"order\",\n      concat('Крепление ', f.name) as \"name\",\n      round(calc.\"value\", 2) as \"value\",\n      'кг' as units,\n      f.price as rate,\n      ceiling(calc.\"value\"*f.price) as cost\n    FROM orders o,\n        calc,\n        fastenings f\n    WHERE calc.id = o.id\n    AND   f.id = o.fastening\n    AND   (f.is_hot_melt_adhesive OR f.is_polyurethane)\n  )\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k92ypvdl",
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
    "id": "dx3cb7qn",
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
    "id": "np7ttgxf",
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
    "id": "iy8hal15",
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
    "id": "egl3i61y",
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
    "id": "sf7wjl2t",
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
    "id": "vel9pflv",
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
    "id": "g3n33g7a",
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
  collection.schema.removeField("aobbjd3u")

  // remove
  collection.schema.removeField("lbkbmpzb")

  // remove
  collection.schema.removeField("92ff3wck")

  // remove
  collection.schema.removeField("tvpjzj8q")

  // remove
  collection.schema.removeField("wtznyxur")

  // remove
  collection.schema.removeField("5uxnpjwv")

  // remove
  collection.schema.removeField("va7stb4p")

  // remove
  collection.schema.removeField("lkxdpgmm")

  return dao.saveCollection(collection)
})
