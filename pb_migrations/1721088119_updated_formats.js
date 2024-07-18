/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfbpjyup",
    "name": "is_risograph_departure_elements_avaliable",
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
  collection.schema.removeField("bfbpjyup")

  return dao.saveCollection(collection)
})
