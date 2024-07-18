/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k83ym09g9l9r0pe")

  collection.name = "available_fastening_full"

  // remove
  collection.schema.removeField("zpqzk4ix")

  // remove
  collection.schema.removeField("hbcqf6et")

  // remove
  collection.schema.removeField("rwr0qzav")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cg8kaenr",
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
    "id": "rwg7qkfx",
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
    "id": "b82fohua",
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

  collection.name = "available_fastering_full"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zpqzk4ix",
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
    "id": "hbcqf6et",
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
    "id": "rwr0qzav",
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
  collection.schema.removeField("cg8kaenr")

  // remove
  collection.schema.removeField("rwg7qkfx")

  // remove
  collection.schema.removeField("b82fohua")

  return dao.saveCollection(collection)
})
