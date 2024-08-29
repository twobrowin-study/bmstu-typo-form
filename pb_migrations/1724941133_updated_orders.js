/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqjj2mpzk0zikk1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jiy6j2ft",
    "name": "sewing",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqjj2mpzk0zikk1")

  // remove
  collection.schema.removeField("jiy6j2ft")

  return dao.saveCollection(collection)
})
