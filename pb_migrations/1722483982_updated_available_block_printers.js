/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s77sghsjzdcfirt")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       formats f\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       formats f\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN TRUE\n        WHEN p.is_ofset AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN \"\"\n        WHEN p.is_ofset AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors c\n  WHERE c.id = o.block_color\n  AND   o.block_paper = \"\"\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN TRUE\n        WHEN p.is_ofset AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN \"\"\n        WHEN p.is_ofset AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors c,\n       formats f\n  WHERE c.id = o.block_color\n  AND   o.block_paper = \"\"\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors c\n  WHERE pp.id = o.block_paper\n  AND   c.id = o.block_color\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color AND c.is_color THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors c,\n       formats f\n  WHERE pp.id = o.block_paper\n  AND   c.id = o.block_color\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n)"
  }

  // remove
  collection.schema.removeField("fgnwmogt")

  // remove
  collection.schema.removeField("xrwouigw")

  // remove
  collection.schema.removeField("co9ggxtk")

  // remove
  collection.schema.removeField("rxbmd8ri")

  // remove
  collection.schema.removeField("v153qsko")

  // remove
  collection.schema.removeField("mufs8c0o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fy75d8tp",
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
    "id": "lxyphyhx",
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
    "id": "jizx06ko",
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
    "id": "3xcp2g7o",
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
    "id": "nnl82bnd",
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
    "id": "t4mgzdxf",
    "name": "non_available_message",
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
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       formats f\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       formats f\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors с,\n       formats f\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n  AND   (NOT o.block_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с,\n       formats f\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n  AND   o.block_departure_elements\n  AND   f.id = o.format\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fgnwmogt",
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
    "id": "xrwouigw",
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
    "id": "co9ggxtk",
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
    "id": "rxbmd8ri",
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
    "id": "v153qsko",
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
    "id": "mufs8c0o",
    "name": "non_available_message",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("fy75d8tp")

  // remove
  collection.schema.removeField("lxyphyhx")

  // remove
  collection.schema.removeField("jizx06ko")

  // remove
  collection.schema.removeField("3xcp2g7o")

  // remove
  collection.schema.removeField("nnl82bnd")

  // remove
  collection.schema.removeField("t4mgzdxf")

  return dao.saveCollection(collection)
})
