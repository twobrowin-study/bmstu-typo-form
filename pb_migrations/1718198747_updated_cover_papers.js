/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gq0cdj9ta2cbq35")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yxbx54qc",
    "name": "is_digital_available",
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
  collection.schema.removeField("yxbx54qc")

  return dao.saveCollection(collection)
})