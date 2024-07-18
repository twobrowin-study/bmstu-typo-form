/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o80eej583nd4h5a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  \"min\",\n  \"max\",\n  step,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    (CASE\n      WHEN fr.is_brace THEN f.brace_max_pages\n      ELSE NULL \n    END) as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fr,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   fr.id = o.fastening\n)"
  }

  // remove
  collection.schema.removeField("kypc68ym")

  // remove
  collection.schema.removeField("gdbudzpb")

  // remove
  collection.schema.removeField("xeuhz7r0")

  // remove
  collection.schema.removeField("uckminvg")

  // remove
  collection.schema.removeField("6ohxrlp5")

  // remove
  collection.schema.removeField("u30xvl50")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azx6cj36",
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
    "id": "95xvzgss",
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
    "id": "3ddsh0cc",
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
    "id": "euuxiacv",
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
    "id": "0bhjviz7",
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
    "id": "v6cs2rmf",
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
    "query": "SELECT\n  id,\n  order_id,\n  \"min\",\n  \"max\",\n  step,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.fastening = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    (CASE\n      WHEN fr.is_brace THEN f.brace_max_pages\n      ELSE NULL \n    END) as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step,\n    ot.has_page_num as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_page_num THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fr,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   fr.id = o.fastening\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kypc68ym",
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
    "id": "gdbudzpb",
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
    "id": "xeuhz7r0",
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
    "id": "uckminvg",
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
    "id": "6ohxrlp5",
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
    "id": "u30xvl50",
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
  collection.schema.removeField("azx6cj36")

  // remove
  collection.schema.removeField("95xvzgss")

  // remove
  collection.schema.removeField("3ddsh0cc")

  // remove
  collection.schema.removeField("euuxiacv")

  // remove
  collection.schema.removeField("0bhjviz7")

  // remove
  collection.schema.removeField("v6cs2rmf")

  return dao.saveCollection(collection)
})
