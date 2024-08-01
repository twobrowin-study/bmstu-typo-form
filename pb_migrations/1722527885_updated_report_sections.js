/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lt9sfijiogs8bpp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ql324ccm",
    "name": "price_name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lt9sfijiogs8bpp")

  // remove
  collection.schema.removeField("ql324ccm")

  return dao.saveCollection(collection)
})
