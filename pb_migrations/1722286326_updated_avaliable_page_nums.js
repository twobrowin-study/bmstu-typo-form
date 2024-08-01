/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o80eej583nd4h5a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  \"min\",\n  \"max\",\n  step,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    FALSE as is_avaliable,\n    \" - выберите вид изделия\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    (CASE\n      WHEN fr.is_brace THEN f.brace_max_pages\n      ELSE NULL \n    END) as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fr,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   fr.id = o.fastening\n)"
  }

  // remove
  collection.schema.removeField("969gyymb")

  // remove
  collection.schema.removeField("oylmj2ji")

  // remove
  collection.schema.removeField("a1jehsji")

  // remove
  collection.schema.removeField("x1aqzx7b")

  // remove
  collection.schema.removeField("i3qpddnp")

  // remove
  collection.schema.removeField("zaw4cqdz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ha4ktod0",
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
    "id": "llj3qpup",
    "name": "min",
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
    "id": "udhvkbdp",
    "name": "max",
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
    "id": "15zsid3c",
    "name": "step",
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
    "id": "y0xmd9dd",
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
    "id": "stzihxl5",
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
  const collection = dao.findCollectionByNameOrId("o80eej583nd4h5a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  \"min\",\n  \"max\",\n  step,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    FALSE as is_avaliable,\n    \" - выберите тип печати\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    (CASE\n      WHEN fr.is_brace THEN f.brace_max_pages\n      ELSE NULL \n    END) as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fr,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   fr.id = o.fastening\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "969gyymb",
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
    "id": "oylmj2ji",
    "name": "min",
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
    "id": "a1jehsji",
    "name": "max",
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
    "id": "x1aqzx7b",
    "name": "step",
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
    "id": "i3qpddnp",
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
    "id": "zaw4cqdz",
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
  collection.schema.removeField("ha4ktod0")

  // remove
  collection.schema.removeField("llj3qpup")

  // remove
  collection.schema.removeField("udhvkbdp")

  // remove
  collection.schema.removeField("15zsid3c")

  // remove
  collection.schema.removeField("y0xmd9dd")

  // remove
  collection.schema.removeField("stzihxl5")

  return dao.saveCollection(collection)
})
