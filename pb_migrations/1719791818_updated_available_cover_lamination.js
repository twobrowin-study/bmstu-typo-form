/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_color = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    c.is_cover_lamination_available as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.id = o.cover_color\n)\n"
  }

  // remove
  collection.schema.removeField("iiwiywsj")

  // remove
  collection.schema.removeField("dubmeu76")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vu5kqqdi",
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
    "id": "1gysifzd",
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
    "id": "rec3cv1i",
    "name": "non_avaliable_message",
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
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  id,\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_color = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    c.is_cover_lamination_available as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.id = o.cover_color\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iiwiywsj",
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
    "id": "dubmeu76",
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
  collection.schema.removeField("vu5kqqdi")

  // remove
  collection.schema.removeField("1gysifzd")

  // remove
  collection.schema.removeField("rec3cv1i")

  return dao.saveCollection(collection)
})
