/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6lws3vcqcvs3ewy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e8kejrwp",
    "name": "is_metal_spring",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nokwsh40",
    "name": "is_plastic_spring",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6lws3vcqcvs3ewy")

  // remove
  collection.schema.removeField("e8kejrwp")

  // remove
  collection.schema.removeField("nokwsh40")

  return dao.saveCollection(collection)
})
