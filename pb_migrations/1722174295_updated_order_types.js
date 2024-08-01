/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wlpatoni",
    "name": "cover_report_section",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lt9sfijiogs8bpp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // remove
  collection.schema.removeField("wlpatoni")

  return dao.saveCollection(collection)
})
