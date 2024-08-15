/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lt9sfijiogs8bpp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wsepatio",
    "name": "collection_name",
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
  collection.schema.removeField("wsepatio")

  return dao.saveCollection(collection)
})
