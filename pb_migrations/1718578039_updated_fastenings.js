/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6lws3vcqcvs3ewy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nzpagmpk",
    "name": "is_hot_melt_adhesive",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tsvmijxk",
    "name": "is_polyurethane",
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
  collection.schema.removeField("nzpagmpk")

  // remove
  collection.schema.removeField("tsvmijxk")

  return dao.saveCollection(collection)
})
