/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s77sghsjzdcfirt")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n)"
  }

  // remove
  collection.schema.removeField("bm7fcojk")

  // remove
  collection.schema.removeField("a38yvzuw")

  // remove
  collection.schema.removeField("rswhwavx")

  // remove
  collection.schema.removeField("q7jxpz4k")

  // remove
  collection.schema.removeField("i0l3ztyx")

  // remove
  collection.schema.removeField("tjntfeze")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bcqkbfbm",
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
    "id": "ti80o8uw",
    "name": "printer_id",
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
    "id": "afbfqccc",
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
    "id": "mse1zbq3",
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
    "id": "mzsyhbdp",
    "name": "is_avaliable",
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
    "id": "ckwxoham",
    "name": "non_avaliable_message",
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
  const collection = dao.findCollectionByNameOrId("s77sghsjzdcfirt")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bm7fcojk",
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
    "id": "a38yvzuw",
    "name": "format_id",
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
    "id": "rswhwavx",
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
    "id": "q7jxpz4k",
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
    "id": "i0l3ztyx",
    "name": "is_avaliable",
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
    "id": "tjntfeze",
    "name": "non_avaliable_message",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("bcqkbfbm")

  // remove
  collection.schema.removeField("ti80o8uw")

  // remove
  collection.schema.removeField("afbfqccc")

  // remove
  collection.schema.removeField("mse1zbq3")

  // remove
  collection.schema.removeField("mzsyhbdp")

  // remove
  collection.schema.removeField("ckwxoham")

  return dao.saveCollection(collection)
})
