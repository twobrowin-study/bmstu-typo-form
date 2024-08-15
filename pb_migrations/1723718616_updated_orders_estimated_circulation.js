/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5pa62hhs3hdp93d")

  collection.listRule = ""

  // remove
  collection.schema.removeField("zvqzlyph")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q34pedfh",
    "name": "estimated_circulation",
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
  const collection = dao.findCollectionByNameOrId("5pa62hhs3hdp93d")

  collection.listRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zvqzlyph",
    "name": "estimated_circulation",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("q34pedfh")

  return dao.saveCollection(collection)
})
