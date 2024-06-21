/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wm1axh9lep4pro4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4mz4aidu",
    "name": "is_datetime",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wm1axh9lep4pro4")

  // remove
  collection.schema.removeField("4mz4aidu")

  return dao.saveCollection(collection)
})
