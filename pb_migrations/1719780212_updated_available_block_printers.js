/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s77sghsjzdcfirt")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n)"
  }

  // remove
  collection.schema.removeField("cvu7142u")

  // remove
  collection.schema.removeField("pgwsegin")

  // remove
  collection.schema.removeField("tsdkyfrw")

  // remove
  collection.schema.removeField("kmoitryw")

  // remove
  collection.schema.removeField("4a1v4mni")

  // remove
  collection.schema.removeField("mmvemdlq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3tvahb7p",
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
    "id": "hrbmzjxr",
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
    "id": "4lzgc8ky",
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
    "id": "kpmq752m",
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
    "id": "t2ygrrls",
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
    "id": "4or9ubeb",
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
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' цветности', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvu7142u",
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
    "id": "pgwsegin",
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
    "id": "tsdkyfrw",
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
    "id": "kmoitryw",
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
    "id": "4a1v4mni",
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
    "id": "mmvemdlq",
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
  collection.schema.removeField("3tvahb7p")

  // remove
  collection.schema.removeField("hrbmzjxr")

  // remove
  collection.schema.removeField("4lzgc8ky")

  // remove
  collection.schema.removeField("kpmq752m")

  // remove
  collection.schema.removeField("t2ygrrls")

  // remove
  collection.schema.removeField("4or9ubeb")

  return dao.saveCollection(collection)
})
