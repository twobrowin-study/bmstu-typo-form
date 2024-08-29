/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxagoiuw",
    "name": "is_cover_paper_only_one_choice",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxagoiuw",
    "name": "is_cover_only_one_choice",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
