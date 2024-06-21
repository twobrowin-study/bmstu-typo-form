/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuf9jzkx4zs4mwb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "85wu8dx6",
    "name": "is_color",
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
  collection.schema.removeField("85wu8dx6")

  return dao.saveCollection(collection)
})
