/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y2wybqih",
    "name": "has_page_num",
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
  collection.schema.removeField("y2wybqih")

  return dao.saveCollection(collection)
})
