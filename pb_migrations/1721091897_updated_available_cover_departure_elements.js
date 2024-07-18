/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fpp5sd24bya0kh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   (o.fastening = \"\" OR o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для принтера \", p.name, \" и формата \", f.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       printers p\n  WHERE ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   f.id = o.format\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   (o.fastening = \"\" OR o.format = \"\" OR o.cover_printer = \"\")\n)"
  }

  // remove
  collection.schema.removeField("ipq8sgjo")

  // remove
  collection.schema.removeField("rqkcsv5d")

  // remove
  collection.schema.removeField("rfbxa4ae")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0xgocfpa",
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
    "id": "ahl2epbp",
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
    "id": "ogt7ozsx",
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
  const collection = dao.findCollectionByNameOrId("0fpp5sd24bya0kh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   (o.fastening = \"\" OR o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для принтера \", p.name, \" и формата \", f.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       printers p\n  WHERE ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   f.id = o.format\n  AND   p.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для принтера \", p.name, \" и формата \", f.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       printers p,\n       fastenings fs\n  WHERE ot.id = o.type\n  AND   ot.has_fastening\n  AND   fs.id = o.fastening\n  AND   f.id = o.format\n  AND   p.id = o.cover_printer\n  AND   p.name in (\"200*200\", \"205*290\")\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ipq8sgjo",
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
    "id": "rqkcsv5d",
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
    "id": "rfbxa4ae",
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
  collection.schema.removeField("0xgocfpa")

  // remove
  collection.schema.removeField("ahl2epbp")

  // remove
  collection.schema.removeField("ogt7ozsx")

  return dao.saveCollection(collection)
})
