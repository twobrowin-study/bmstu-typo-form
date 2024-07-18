/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqjj2mpzk0zikk1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bvea93yw",
    "name": "cover_lamination",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1wsvcmoq1q4l6w2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqjj2mpzk0zikk1")

  // remove
  collection.schema.removeField("bvea93yw")

  return dao.saveCollection(collection)
})
