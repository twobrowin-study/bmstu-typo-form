/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k83ym09g9l9r0pe")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберите вид изделия\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_fastening as is_available,\n    (CASE\n      WHEN NOT ot.has_fastening THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n)\n"
  }

  // remove
  collection.schema.removeField("ekap2jtr")

  // remove
  collection.schema.removeField("sak0djpc")

  // remove
  collection.schema.removeField("anmuhclh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "06vpr5y1",
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
    "id": "rumy7unw",
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
    "id": "hftexoub",
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
  const collection = dao.findCollectionByNameOrId("k83ym09g9l9r0pe")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберите тип печати\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_fastening as is_available,\n    (CASE\n      WHEN NOT ot.has_fastening THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ekap2jtr",
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
    "id": "sak0djpc",
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
    "id": "anmuhclh",
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
  collection.schema.removeField("06vpr5y1")

  // remove
  collection.schema.removeField("rumy7unw")

  // remove
  collection.schema.removeField("hftexoub")

  return dao.saveCollection(collection)
})
