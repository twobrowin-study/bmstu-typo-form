/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n2xux2bvcbwgcuf")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       formats f\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_available,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_available,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       formats f\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_available,\n    (CASE\n        WHEN p.is_risograph AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors c\n  WHERE c.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n        WHEN p.is_risograph AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_available,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors c,\n       formats f\n  WHERE c.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_available,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors c\n  WHERE pp.id = o.cover_paper\n  AND   c.id = o.cover_color\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_available,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors c,\n       formats f\n  WHERE pp.id = o.cover_paper\n  AND   c.id = o.cover_color\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n)"
  }

  // remove
  collection.schema.removeField("crcecn58")

  // remove
  collection.schema.removeField("acymsdpp")

  // remove
  collection.schema.removeField("bkbhaiio")

  // remove
  collection.schema.removeField("lkhliojk")

  // remove
  collection.schema.removeField("kdyhqmwh")

  // remove
  collection.schema.removeField("3gkbxmns")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtngdx58",
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
    "id": "spqrqcah",
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
    "id": "fkdvwv0x",
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
    "id": "yr0eomdj",
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
    "id": "vvqandiy",
    "name": "is_available",
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
    "id": "udeo3prp",
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
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       formats f\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       formats f\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors c\n  WHERE c.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       colors c,\n       formats f\n  WHERE c.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors c\n  WHERE pp.id = o.cover_paper\n  AND   c.id = o.cover_color\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n        WHEN p.is_risograph AND pp.is_risograph_available AND c.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_bw AND NOT c.is_color THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available AND c.is_digital_available AND p.is_digital_color THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available AND c.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', c.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors c,\n       formats f\n  WHERE pp.id = o.cover_paper\n  AND   c.id = o.cover_color\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "crcecn58",
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
    "id": "acymsdpp",
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
    "id": "bkbhaiio",
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
    "id": "lkhliojk",
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
    "id": "kdyhqmwh",
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
    "id": "3gkbxmns",
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
  collection.schema.removeField("gtngdx58")

  // remove
  collection.schema.removeField("spqrqcah")

  // remove
  collection.schema.removeField("fkdvwv0x")

  // remove
  collection.schema.removeField("yr0eomdj")

  // remove
  collection.schema.removeField("vvqandiy")

  // remove
  collection.schema.removeField("udeo3prp")

  return dao.saveCollection(collection)
})
