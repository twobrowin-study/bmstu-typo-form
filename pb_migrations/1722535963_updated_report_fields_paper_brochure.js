/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8sx7g50waw7ibn")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format != '700*500'\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format != '700*500'\n\n  UNION\n\n  -- Бумага на блок 700*500\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' 700*1000 блок') as \"name\",\n    ceiling(obc.block_full_sheets/2) as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(ceiling(obc.block_full_sheets/2)*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format = '700*500'\n\n  UNION\n\n  -- Бумага на обложку 700*500\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' 700*1000 обложка') as \"name\",\n    ceiling(occ.cover_sheets/2) as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(ceiling(occ.cover_sheets/2)*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format = '700*500'\n)"
  }

  // remove
  collection.schema.removeField("icbhiwui")

  // remove
  collection.schema.removeField("45mhyrv0")

  // remove
  collection.schema.removeField("bvmpo1yf")

  // remove
  collection.schema.removeField("uf9i6sfd")

  // remove
  collection.schema.removeField("rlglthcs")

  // remove
  collection.schema.removeField("xccmyxat")

  // remove
  collection.schema.removeField("jawdhlo2")

  // remove
  collection.schema.removeField("vcybukkz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qsfyvu7i",
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
    "id": "hxxsy6is",
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
    "id": "zdzthmz3",
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
    "id": "w8y50e9j",
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
    "id": "rreb4ha2",
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
    "id": "qpj3fhot",
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
    "id": "1bz2d8fk",
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
    "id": "hrtihyru",
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
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на блок\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' ', obp.block_format, ' блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format != '700*500'\n\n  UNION\n\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format != '700*500'\n\n  UNION\n\n  -- Бумага на блок 700*500\n  SELECT\n    concat(o.id, '_block_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    100 as \"order\",\n    concat(bp.name, ' 700*1000 блок') as \"name\",\n    obc.block_full_sheets as \"value\",\n    'шт.' as units,\n    bp.price as rate,\n    round(obc.block_full_sheets*bp.price, 1) as cost\n  FROM orders o,\n        orders_block_processed obp,\n        orders_block_calc obc,\n        papers bp\n  WHERE obp.id = o.id\n  AND   obc.id = o.id\n  AND   bp.id = o.block_paper\n  AND   obp.block_format = '700*500'\n\n  UNION\n\n  -- Бумага на обложку 700*500\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' 700*1000 обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    cp.price as rate,\n    round(occ.cover_sheets*cp.price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format = '700*500'\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "icbhiwui",
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
    "id": "45mhyrv0",
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
    "id": "bvmpo1yf",
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
    "id": "uf9i6sfd",
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
    "id": "rlglthcs",
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
    "id": "xccmyxat",
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
    "id": "jawdhlo2",
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
    "id": "vcybukkz",
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
  collection.schema.removeField("qsfyvu7i")

  // remove
  collection.schema.removeField("hxxsy6is")

  // remove
  collection.schema.removeField("zdzthmz3")

  // remove
  collection.schema.removeField("w8y50e9j")

  // remove
  collection.schema.removeField("rreb4ha2")

  // remove
  collection.schema.removeField("qpj3fhot")

  // remove
  collection.schema.removeField("1bz2d8fk")

  // remove
  collection.schema.removeField("hrtihyru")

  return dao.saveCollection(collection)
})
