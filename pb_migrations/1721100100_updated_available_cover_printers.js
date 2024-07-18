/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n2xux2bvcbwgcuf")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       formats f\n  WHERE o.cover_paper = \"\"\n  AND   o.cover_color = \"\"\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN \"\"\n        WHEN p.is_digital AND pp.is_digital_available THEN \"\"\n        WHEN p.is_ofset AND pp.is_ofset_available THEN \"\"\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.cover_paper\n  AND   o.cover_color = \"\"\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n)"
  }

  // remove
  collection.schema.removeField("m3ymgwgl")

  // remove
  collection.schema.removeField("ds5jyp3k")

  // remove
  collection.schema.removeField("0cxlpllh")

  // remove
  collection.schema.removeField("rjyyepat")

  // remove
  collection.schema.removeField("flkdipxa")

  // remove
  collection.schema.removeField("h3cp3un4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkr6xzxr",
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
    "id": "uwskmqny",
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
    "id": "bnsvxqwt",
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
    "id": "qaltsd6x",
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
    "id": "wwqshffd",
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
    "id": "y9apnyba",
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
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       printers p\n  WHERE (o.cover_paper = \"\" OR o.cover_color = \"\")\n  AND   (NOT o.cover_departure_elements OR o.format = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для формата \", f.name, \" и при элементах на вылет\")\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       printers p,\n       formats f\n  WHERE (o.cover_paper = \"\" OR o.cover_color = \"\")\n  AND   o.cover_departure_elements\n  AND   f.id = o.format\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m3ymgwgl",
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
    "id": "ds5jyp3k",
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
    "id": "0cxlpllh",
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
    "id": "rjyyepat",
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
    "id": "flkdipxa",
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
    "id": "h3cp3un4",
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
  collection.schema.removeField("bkr6xzxr")

  // remove
  collection.schema.removeField("uwskmqny")

  // remove
  collection.schema.removeField("bnsvxqwt")

  // remove
  collection.schema.removeField("qaltsd6x")

  // remove
  collection.schema.removeField("wwqshffd")

  // remove
  collection.schema.removeField("y9apnyba")

  return dao.saveCollection(collection)
})
