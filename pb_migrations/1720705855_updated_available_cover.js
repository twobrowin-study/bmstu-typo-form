/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message,\n  full_is_available,\n  full_non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_available_message,\n    FALSE as full_is_available,\n    \" - выберете тип печати\" as full_non_available_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type = \"\"\n\n  UNION\n  \n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type != \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN NOT p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE \"\"\n    END) as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message\n  FROM orders o,\n       papers p\n  WHERE p.id = o.cover_paper\n  AND   o.type != \"\"\n)\n"
  }

  // remove
  collection.schema.removeField("zjh5m4hc")

  // remove
  collection.schema.removeField("x2cgh3ds")

  // remove
  collection.schema.removeField("4x3oz9zj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dlqxgbzo",
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
    "id": "a8b0tgcw",
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
    "id": "rxzqbysq",
    "name": "non_available_message",
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
    "id": "o6jbimda",
    "name": "full_is_available",
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
    "id": "lf131amo",
    "name": "full_non_available_message",
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
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type = \"\"\n\n  UNION\n  \n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type != \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN NOT p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       papers p\n  WHERE p.id = o.cover_paper\n  AND   o.type != \"\"\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zjh5m4hc",
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
    "id": "x2cgh3ds",
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
    "id": "4x3oz9zj",
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
  collection.schema.removeField("dlqxgbzo")

  // remove
  collection.schema.removeField("a8b0tgcw")

  // remove
  collection.schema.removeField("rxzqbysq")

  // remove
  collection.schema.removeField("o6jbimda")

  // remove
  collection.schema.removeField("lf131amo")

  return dao.saveCollection(collection)
})
