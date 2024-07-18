/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n      papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n)"
  }

  // remove
  collection.schema.removeField("8szmm0z6")

  // remove
  collection.schema.removeField("qyu1pcnn")

  // remove
  collection.schema.removeField("x6zd9ruf")

  // remove
  collection.schema.removeField("zoyccxxw")

  // remove
  collection.schema.removeField("pliyrakc")

  // remove
  collection.schema.removeField("lt2e83be")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cjinbeqk",
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
    "id": "zqpverhp",
    "name": "paper_id",
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
    "id": "gzqnviuz",
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
    "id": "jgc4ryve",
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
    "id": "gabzfurm",
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
    "id": "hqoynfmz",
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
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_avaliable_message\n  FROM orders o,\n      papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8szmm0z6",
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
    "id": "qyu1pcnn",
    "name": "paper_id",
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
    "id": "x6zd9ruf",
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
    "id": "zoyccxxw",
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
    "id": "pliyrakc",
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
    "id": "lt2e83be",
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
  collection.schema.removeField("cjinbeqk")

  // remove
  collection.schema.removeField("zqpverhp")

  // remove
  collection.schema.removeField("gzqnviuz")

  // remove
  collection.schema.removeField("jgc4ryve")

  // remove
  collection.schema.removeField("gabzfurm")

  // remove
  collection.schema.removeField("hqoynfmz")

  return dao.saveCollection(collection)
})
