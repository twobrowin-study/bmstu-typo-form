/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("otyj355fus3kaxb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ds3oteu",
    "name": "is_colorfull",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("otyj355fus3kaxb")

  // remove
  collection.schema.removeField("1ds3oteu")

  return dao.saveCollection(collection)
})
