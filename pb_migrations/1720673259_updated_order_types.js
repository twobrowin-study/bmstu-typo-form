/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  collection.listRule = ""
  collection.viewRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iy04zpqc",
    "name": "has_block",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "byz6u8my",
    "name": "has_fastening",
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

  collection.listRule = null
  collection.viewRule = null

  // remove
  collection.schema.removeField("iy04zpqc")

  // remove
  collection.schema.removeField("byz6u8my")

  return dao.saveCollection(collection)
})
