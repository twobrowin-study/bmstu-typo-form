/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wo478d0kqiy4j48")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jxl8ugyb",
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
  const collection = dao.findCollectionByNameOrId("wo478d0kqiy4j48")

  // remove
  collection.schema.removeField("jxl8ugyb")

  return dao.saveCollection(collection)
})
