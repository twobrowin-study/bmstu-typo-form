/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lt9sfijiogs8bpp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "flpqsr44",
    "name": "has_units",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usqoxx8g",
    "name": "has_rate",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lt9sfijiogs8bpp")

  // remove
  collection.schema.removeField("flpqsr44")

  // remove
  collection.schema.removeField("usqoxx8g")

  return dao.saveCollection(collection)
})
