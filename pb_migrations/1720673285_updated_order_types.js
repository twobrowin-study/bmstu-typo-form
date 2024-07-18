/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pcfivrre",
    "name": "is_active",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // remove
  collection.schema.removeField("pcfivrre")

  return dao.saveCollection(collection)
})
