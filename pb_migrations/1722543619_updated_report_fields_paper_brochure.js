/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8sx7g50waw7ibn")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    round(obc.block_full_sheets*obp.block_paper_price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format != '700*500'\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(occ.cover_sheets*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format != '700*500'\n\n  UNION\n\n  -- Бумага на блок 700*500\n  SELECT\n    concat(o.id, '_block_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' 700*1000 блок') as \"name\",\n    ceiling(obc.block_full_sheets/2) as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    round(obc.block_full_sheets*obp.block_paper_price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format = '700*500'\n\n  UNION\n\n  -- Бумага на обложку 700*500\n  SELECT\n    concat(o.id, '_cover_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' 700*1000 обложка') as \"name\",\n    ceiling(occ.cover_sheets/2) as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(ceiling(occ.cover_sheets/2)*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format = '700*500'\n)"
  }

  // remove
  collection.schema.removeField("v9njdxag")

  // remove
  collection.schema.removeField("cfsyvmom")

  // remove
  collection.schema.removeField("szswq1cw")

  // remove
  collection.schema.removeField("yvza0dmu")

  // remove
  collection.schema.removeField("dgloqbou")

  // remove
  collection.schema.removeField("f91rigna")

  // remove
  collection.schema.removeField("lyjrgxyj")

  // remove
  collection.schema.removeField("44docdgo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4grgqg7k",
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
    "id": "3iulq02k",
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
    "id": "2xlpieuy",
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
    "id": "3taaywvm",
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
    "id": "jwprxfso",
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
    "id": "lrhnlp66",
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
    "id": "nyyglvxq",
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
    "id": "xi1qhmjl",
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
  const collection = dao.findCollectionByNameOrId("e8sx7g50waw7ibn")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    round(obc.block_full_sheets*obp.block_paper_price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format != '700*500'\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format != '700*500'\n\n  UNION\n\n  -- Бумага на блок 700*500\n  SELECT\n    concat(o.id, '_block_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' 700*1000 блок') as \"name\",\n    ceiling(obc.block_full_sheets/2) as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    round(obc.block_full_sheets*obp.block_paper_price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format = '700*500'\n\n  UNION\n\n  -- Бумага на обложку 700*500\n  SELECT\n    concat(o.id, '_cover_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' 700*1000 обложка') as \"name\",\n    ceiling(occ.cover_sheets/2) as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(ceiling(occ.cover_sheets/2)*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format = '700*500'\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v9njdxag",
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
    "id": "cfsyvmom",
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
    "id": "szswq1cw",
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
    "id": "yvza0dmu",
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
    "id": "dgloqbou",
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
    "id": "f91rigna",
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
    "id": "lyjrgxyj",
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
    "id": "44docdgo",
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
  collection.schema.removeField("4grgqg7k")

  // remove
  collection.schema.removeField("3iulq02k")

  // remove
  collection.schema.removeField("2xlpieuy")

  // remove
  collection.schema.removeField("3taaywvm")

  // remove
  collection.schema.removeField("jwprxfso")

  // remove
  collection.schema.removeField("lrhnlp66")

  // remove
  collection.schema.removeField("nyyglvxq")

  // remove
  collection.schema.removeField("xi1qhmjl")

  return dao.saveCollection(collection)
})
