/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gq0cdj9ta2cbq35")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7hgpa1qr",
    "name": "for_7bc",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gq0cdj9ta2cbq35")

  // remove
  collection.schema.removeField("7hgpa1qr")

  return dao.saveCollection(collection)
})
