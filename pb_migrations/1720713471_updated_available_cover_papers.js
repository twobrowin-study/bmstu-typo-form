/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n  AND   o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    NOT p.is_empty OR ot.has_block as is_avaliable,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно при типе \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN FALSE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно при типе \", ot.name)\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      papers p,\n      printers pr,\n      order_types ot\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   ot.id = o.type\n)"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yugd1mb6",
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
    "id": "l7uspbue",
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
    "id": "jzk2z8af",
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
    "id": "dsbuqha6",
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
    "id": "shcg1q0z",
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
    "id": "kay8xn6r",
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
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n      papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n)"
  }

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

  // remove
  collection.schema.removeField("yugd1mb6")

  // remove
  collection.schema.removeField("l7uspbue")

  // remove
  collection.schema.removeField("jzk2z8af")

  // remove
  collection.schema.removeField("dsbuqha6")

  // remove
  collection.schema.removeField("shcg1q0z")

  // remove
  collection.schema.removeField("kay8xn6r")

  return dao.saveCollection(collection)
})
