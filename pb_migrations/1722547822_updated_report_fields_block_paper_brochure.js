/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d7n23lbm6zx8i4q")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format) as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    ceiling(obc.block_full_sheets*obp.block_paper_price) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format != '700*500'\n\n  UNION\n\n  -- Бумага на блок 700*500\n  SELECT\n    concat(o.id, '_block_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' 700*1000') as \"name\",\n    ceiling(obc.block_full_sheets/2) as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    ceiling(obc.block_full_sheets*obp.block_paper_price) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format = '700*500'\n)"
  }

  // remove
  collection.schema.removeField("ueysnmuo")

  // remove
  collection.schema.removeField("tftn1f2e")

  // remove
  collection.schema.removeField("nwzwnful")

  // remove
  collection.schema.removeField("g1ljszos")

  // remove
  collection.schema.removeField("vqew3r3w")

  // remove
  collection.schema.removeField("suh1hwl9")

  // remove
  collection.schema.removeField("6340itkz")

  // remove
  collection.schema.removeField("zsbkrtm7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c74xv4yt",
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
    "id": "jkp1jqxe",
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
    "id": "sk8rkuym",
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
    "id": "fbgkn3gd",
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
    "id": "oseliyv6",
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
    "id": "hhldqe99",
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
    "id": "qlbylfzw",
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
    "id": "slsoeljj",
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
  const collection = dao.findCollectionByNameOrId("d7n23lbm6zx8i4q")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    ceiling(obc.block_full_sheets*obp.block_paper_price) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format != '700*500'\n\n  UNION\n\n  -- Бумага на блок 700*500\n  SELECT\n    concat(o.id, '_block_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' 700*1000 блок') as \"name\",\n    ceiling(obc.block_full_sheets/2) as \"value\",\n    'шт.' as units,\n    obp.block_paper_price as rate,\n    ceiling(obc.block_full_sheets*obp.block_paper_price) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format = '700*500'\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ueysnmuo",
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
    "id": "tftn1f2e",
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
    "id": "nwzwnful",
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
    "id": "g1ljszos",
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
    "id": "vqew3r3w",
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
    "id": "suh1hwl9",
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
    "id": "6340itkz",
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
    "id": "zsbkrtm7",
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
  collection.schema.removeField("c74xv4yt")

  // remove
  collection.schema.removeField("jkp1jqxe")

  // remove
  collection.schema.removeField("sk8rkuym")

  // remove
  collection.schema.removeField("fbgkn3gd")

  // remove
  collection.schema.removeField("oseliyv6")

  // remove
  collection.schema.removeField("hhldqe99")

  // remove
  collection.schema.removeField("qlbylfzw")

  // remove
  collection.schema.removeField("slsoeljj")

  return dao.saveCollection(collection)
})
