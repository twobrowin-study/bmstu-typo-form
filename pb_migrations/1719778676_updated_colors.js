/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuf9jzkx4zs4mwb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cjc6iahh",
    "name": "is_ofset_available",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cjc6iahh",
    "name": "is_ofset_avaliable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
