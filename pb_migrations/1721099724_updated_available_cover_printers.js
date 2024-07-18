/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n2xux2bvcbwgcuf")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       formats f\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       formats f\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors с,\n       formats f\n  WHERE с.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.cover_paper\n  AND   с.id = o.cover_color\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с,\n       formats f\n  WHERE pp.id = o.cover_paper\n  AND   с.id = o.cover_color\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n)"
  }

  // remove
  collection.schema.removeField("ex1fhkpw")

  // remove
  collection.schema.removeField("tjo0docd")

  // remove
  collection.schema.removeField("w0jco5jx")

  // remove
  collection.schema.removeField("symrony5")

  // remove
  collection.schema.removeField("vcza1xgy")

  // remove
  collection.schema.removeField("nrk76k0g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fdbbdvwn",
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
    "id": "aafephqw",
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
    "id": "xu1n7kj6",
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
    "id": "tqvkx4g9",
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
    "id": "qr8ybluh",
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
    "id": "zdh733m4",
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
  const collection = dao.findCollectionByNameOrId("n2xux2bvcbwgcuf")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.cover_paper\n  AND   с.id = o.cover_color\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ex1fhkpw",
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
    "id": "tjo0docd",
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
    "id": "w0jco5jx",
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
    "id": "symrony5",
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
    "id": "vcza1xgy",
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
    "id": "nrk76k0g",
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
  collection.schema.removeField("fdbbdvwn")

  // remove
  collection.schema.removeField("aafephqw")

  // remove
  collection.schema.removeField("xu1n7kj6")

  // remove
  collection.schema.removeField("tqvkx4g9")

  // remove
  collection.schema.removeField("qr8ybluh")

  // remove
  collection.schema.removeField("zdh733m4")

  return dao.saveCollection(collection)
})
