/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9rz96wpe0v9d93")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  color_id,\n  name,\n  \"order\",\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o,\n       colors c\n  WHERE o.cover_printer = \"\"\n  AND   o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN ot.is_7bc AND NOT c.for_7bc THEN FALSE\n      WHEN ot.is_7bc AND     c.for_7bc THEN TRUE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN ot.is_7bc AND NOT c.for_7bc THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN ot.is_7bc AND     c.for_7bc THEN \"\"\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       colors c,\n       order_types ot\n  WHERE o.cover_printer = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN ot.is_7bc AND NOT c.for_7bc THEN FALSE\n      WHEN ot.is_7bc AND     c.for_7bc THEN TRUE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_bw AND NOT c.is_color THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_color THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_available,\n    (CASE\n      WHEN ot.is_7bc AND NOT c.for_7bc THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN ot.is_7bc AND     c.for_7bc THEN \"\"\n      WHEN pr.is_risograph AND c.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_bw AND NOT c.is_color THEN \"\"\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_color THEN \"\"\n      WHEN pr.is_ofset AND c.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n       colors c,\n       printers pr,\n       order_types ot\n  WHERE pr.id = o.cover_printer\n  AND   ot.id = o.type\n)"
  }

  // remove
  collection.schema.removeField("h6klvaij")

  // remove
  collection.schema.removeField("si7uf2bn")

  // remove
  collection.schema.removeField("v7a4poyh")

  // remove
  collection.schema.removeField("ayl9ampf")

  // remove
  collection.schema.removeField("scx78f5n")

  // remove
  collection.schema.removeField("29rwuwne")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsspdqqq",
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
    "id": "r1gkhral",
    "name": "color_id",
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
    "id": "fn2wrtr6",
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
    "id": "doba40kd",
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
    "id": "ogoann6m",
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
    "id": "lgljp91k",
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
  const collection = dao.findCollectionByNameOrId("m9rz96wpe0v9d93")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  color_id,\n  name,\n  \"order\",\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o,\n       colors c\n  WHERE o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_bw AND NOT c.is_color THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_color THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_available,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_bw AND NOT c.is_color THEN \"\"\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_color THEN \"\"\n      WHEN pr.is_ofset AND c.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n       colors c,\n       printers pr\n  WHERE pr.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h6klvaij",
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
    "id": "si7uf2bn",
    "name": "color_id",
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
    "id": "v7a4poyh",
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
    "id": "ayl9ampf",
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
    "id": "scx78f5n",
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
    "id": "29rwuwne",
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
  collection.schema.removeField("fsspdqqq")

  // remove
  collection.schema.removeField("r1gkhral")

  // remove
  collection.schema.removeField("fn2wrtr6")

  // remove
  collection.schema.removeField("doba40kd")

  // remove
  collection.schema.removeField("ogoann6m")

  // remove
  collection.schema.removeField("lgljp91k")

  return dao.saveCollection(collection)
})
