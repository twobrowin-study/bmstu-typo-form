/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wh0d3nkuokqcta5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3tod5qk8",
    "name": "is_risograph",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gasfyvtv",
    "name": "is_digital",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wh0d3nkuokqcta5")

  // remove
  collection.schema.removeField("3tod5qk8")

  // remove
  collection.schema.removeField("gasfyvtv")

  return dao.saveCollection(collection)
})
