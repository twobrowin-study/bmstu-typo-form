/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o80eej583nd4h5a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  \"min\",\n  \"max\",\n  step,\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    FALSE as is_available,\n    \" - выберите вид изделия\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_available,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    (CASE\n      WHEN fr.is_brace THEN f.brace_max_pages\n      ELSE NULL \n    END) as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_available,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fr,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   fr.id = o.fastening\n)"
  }

  // remove
  collection.schema.removeField("orgezwux")

  // remove
  collection.schema.removeField("0zs4z3gw")

  // remove
  collection.schema.removeField("b20ub3t4")

  // remove
  collection.schema.removeField("v801lgbx")

  // remove
  collection.schema.removeField("hzbb24gw")

  // remove
  collection.schema.removeField("r3hgwfti")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sp2qcojc",
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
    "id": "fefofaly",
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
    "id": "bmvht6im",
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
    "id": "s2sl1zos",
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
    "id": "kuylrr0t",
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
    "id": "pv3kzbls",
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
    "query": "SELECT\n  id,\n  order_id,\n  \"min\",\n  \"max\",\n  step,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    FALSE as is_avaliable,\n    \" - выберите вид изделия\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    (CASE\n      WHEN fr.is_brace THEN f.brace_max_pages\n      ELSE NULL \n    END) as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fr,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   fr.id = o.fastening\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "orgezwux",
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
    "id": "0zs4z3gw",
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
    "id": "b20ub3t4",
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
    "id": "v801lgbx",
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
    "id": "hzbb24gw",
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
    "id": "r3hgwfti",
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
  collection.schema.removeField("sp2qcojc")

  // remove
  collection.schema.removeField("fefofaly")

  // remove
  collection.schema.removeField("bmvht6im")

  // remove
  collection.schema.removeField("s2sl1zos")

  // remove
  collection.schema.removeField("kuylrr0t")

  // remove
  collection.schema.removeField("pv3kzbls")

  return dao.saveCollection(collection)
})
