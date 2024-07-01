/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n2xux2bvcbwgcuf")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.cover_paper\n  AND   с.id = o.cover_color\n)"
  }

  // remove
  collection.schema.removeField("848rjksi")

  // remove
  collection.schema.removeField("qztopfux")

  // remove
  collection.schema.removeField("oyqmz32h")

  // remove
  collection.schema.removeField("05qypp4i")

  // remove
  collection.schema.removeField("zheusotm")

  // remove
  collection.schema.removeField("ykqpw5gt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bzpugdlh",
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
    "id": "acumi1jn",
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
    "id": "m4xiquaf",
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
    "id": "9hx5xnqu",
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
    "id": "qrdvrtvv",
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
    "id": "pelfuchp",
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
  const collection = dao.findCollectionByNameOrId("n2xux2bvcbwgcuf")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.cover_color\n  AND   o.cover_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.cover_paper\n  AND   с.id = o.cover_color\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "848rjksi",
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
    "id": "qztopfux",
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
    "id": "oyqmz32h",
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
    "id": "05qypp4i",
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
    "id": "zheusotm",
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
    "id": "ykqpw5gt",
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
  collection.schema.removeField("bzpugdlh")

  // remove
  collection.schema.removeField("acumi1jn")

  // remove
  collection.schema.removeField("m4xiquaf")

  // remove
  collection.schema.removeField("9hx5xnqu")

  // remove
  collection.schema.removeField("qrdvrtvv")

  // remove
  collection.schema.removeField("pelfuchp")

  return dao.saveCollection(collection)
})
