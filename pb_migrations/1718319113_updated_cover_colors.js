/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuf9jzkx4zs4mwb")

  collection.name = "colors"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cqzmgl3x",
    "name": "is_block_avaliable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5vjwl8fs",
    "name": "is_cover_avaliable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lcfsive6",
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
  const collection = dao.findCollectionByNameOrId("yuf9jzkx4zs4mwb")

  collection.name = "cover_colors"

  // remove
  collection.schema.removeField("cqzmgl3x")

  // remove
  collection.schema.removeField("5vjwl8fs")

  // remove
  collection.schema.removeField("lcfsive6")

  return dao.saveCollection(collection)
})
