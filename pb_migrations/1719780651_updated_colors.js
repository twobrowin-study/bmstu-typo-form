/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuf9jzkx4zs4mwb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jegm0bnu",
    "name": "is_cover_lamination_available",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuf9jzkx4zs4mwb")

  // remove
  collection.schema.removeField("jegm0bnu")

  return dao.saveCollection(collection)
})
