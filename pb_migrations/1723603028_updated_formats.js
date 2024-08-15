/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uesmy5t4",
    "name": "is_smal",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb")

  // remove
  collection.schema.removeField("uesmy5t4")

  return dao.saveCollection(collection)
})
