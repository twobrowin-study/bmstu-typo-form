/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oe3ikqzqo5bub36")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  color_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n      colors c\n  WHERE c.is_block_avaliable\n  AND   o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_bw AND NOT c.is_color THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_color THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_bw AND NOT c.is_color THEN \"\"\n      WHEN pr.is_digital AND c.is_digital_available AND pr.is_digital_color THEN \"\"\n      WHEN pr.is_ofset AND c.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_block_avaliable\n  AND   pr.id = o.block_printer\n)"
  }

  // remove
  collection.schema.removeField("h7u5m4t4")

  // remove
  collection.schema.removeField("rizvjued")

  // remove
  collection.schema.removeField("vla0g3co")

  // remove
  collection.schema.removeField("qr0uu4sg")

  // remove
  collection.schema.removeField("xjipjh8x")

  // remove
  collection.schema.removeField("f3yeujje")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7xso92ub",
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
    "id": "9ohgxmcl",
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
    "id": "6mrgdc2k",
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
    "id": "ch0fewef",
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
    "id": "8rr7qcjd",
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
    "id": "5mvfpapg",
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
  const collection = dao.findCollectionByNameOrId("oe3ikqzqo5bub36")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  color_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n      colors c\n  WHERE c.is_block_avaliable\n  AND   o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND c.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND c.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_block_avaliable\n  AND   pr.id = o.block_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h7u5m4t4",
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
    "id": "rizvjued",
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
    "id": "vla0g3co",
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
    "id": "qr0uu4sg",
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
    "id": "xjipjh8x",
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
    "id": "f3yeujje",
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
  collection.schema.removeField("7xso92ub")

  // remove
  collection.schema.removeField("9ohgxmcl")

  // remove
  collection.schema.removeField("6mrgdc2k")

  // remove
  collection.schema.removeField("ch0fewef")

  // remove
  collection.schema.removeField("8rr7qcjd")

  // remove
  collection.schema.removeField("5mvfpapg")

  return dao.saveCollection(collection)
})
