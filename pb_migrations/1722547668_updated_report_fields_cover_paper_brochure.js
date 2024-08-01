/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vazimmxsrkibfh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    ceiling(occ.cover_sheets*ocp.cover_paper_price) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format != '700*500'\n\n  UNION\n\n  -- Бумага на обложку 700*500\n  SELECT\n    concat(o.id, '_cover_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' 700*1000 обложка') as \"name\",\n    ceiling(occ.cover_sheets/2) as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    ceiling(ceiling(occ.cover_sheets/2)*ocp.cover_paper_price) as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format = '700*500'\n)"
  }

  // remove
  collection.schema.removeField("kyllj7vs")

  // remove
  collection.schema.removeField("04dhrs15")

  // remove
  collection.schema.removeField("2gucohbo")

  // remove
  collection.schema.removeField("glv86ddk")

  // remove
  collection.schema.removeField("rippwgmv")

  // remove
  collection.schema.removeField("m7og6rdy")

  // remove
  collection.schema.removeField("xhvldbp3")

  // remove
  collection.schema.removeField("mxfif3e7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lyb11lpg",
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
    "id": "ljvwamqf",
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
    "id": "a0r6r4oq",
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
    "id": "jf4jqjhf",
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
    "id": "3ffrf43q",
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
    "id": "dh65onp9",
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
    "id": "ivft6mzg",
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
    "id": "vg1vlxz3",
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
  const collection = dao.findCollectionByNameOrId("9vazimmxsrkibfh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Бумага на обложку\n  SELECT\n    concat(o.id, '_cover_paper_outgo') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' ', ocp.cover_format, ' обложка') as \"name\",\n    occ.cover_sheets as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(occ.cover_sheets*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n        orders_cover_processed ocp,\n        orders_cover_calc occ,\n        papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format != '700*500'\n\n  UNION\n\n  -- Бумага на обложку 700*500\n  SELECT\n    concat(o.id, '_cover_paper_outgo_ofset') as id,\n    o.id as order_id,\n    '000006_materals' as section_id,\n    101 as \"order\",\n    concat(cp.name, ' 700*1000 обложка') as \"name\",\n    ceiling(occ.cover_sheets/2) as \"value\",\n    'шт.' as units,\n    ocp.cover_paper_price as rate,\n    round(ceiling(occ.cover_sheets/2)*ocp.cover_paper_price, 1) as cost\n  FROM orders o,\n       orders_cover_processed ocp,\n       orders_cover_calc occ,\n       papers cp\n  WHERE ocp.id = o.id\n  AND   occ.id = o.id\n  AND   cp.id = o.cover_paper\n  AND   ocp.cover_format = '700*500'\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kyllj7vs",
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
    "id": "04dhrs15",
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
    "id": "2gucohbo",
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
    "id": "glv86ddk",
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
    "id": "rippwgmv",
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
    "id": "m7og6rdy",
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
    "id": "xhvldbp3",
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
    "id": "mxfif3e7",
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
  collection.schema.removeField("lyb11lpg")

  // remove
  collection.schema.removeField("ljvwamqf")

  // remove
  collection.schema.removeField("a0r6r4oq")

  // remove
  collection.schema.removeField("jf4jqjhf")

  // remove
  collection.schema.removeField("3ffrf43q")

  // remove
  collection.schema.removeField("dh65onp9")

  // remove
  collection.schema.removeField("ivft6mzg")

  // remove
  collection.schema.removeField("vg1vlxz3")

  return dao.saveCollection(collection)
})
