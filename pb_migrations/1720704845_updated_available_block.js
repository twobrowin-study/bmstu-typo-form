/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4nnbua1ao2hmvbk")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message\nFROM (\n      SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_block as is_available,\n    (CASE\n      WHEN NOT ot.has_block THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n)"
  }

  // remove
  collection.schema.removeField("znihbwmi")

  // remove
  collection.schema.removeField("d9l4t0xv")

  // remove
  collection.schema.removeField("oo6y91wd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3kcn6xdt",
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
    "id": "nypizamr",
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
    "id": "stgzqq2p",
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
  const collection = dao.findCollectionByNameOrId("4nnbua1ao2hmvbk")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_avaliable_message\nFROM (\n      SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_avaliable_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_block as is_available,\n    (CASE\n      WHEN NOT ot.has_block THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE \"\"\n    END) as non_avaliable_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "znihbwmi",
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
    "id": "d9l4t0xv",
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
    "id": "oo6y91wd",
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
  collection.schema.removeField("3kcn6xdt")

  // remove
  collection.schema.removeField("nypizamr")

  // remove
  collection.schema.removeField("stgzqq2p")

  return dao.saveCollection(collection)
})