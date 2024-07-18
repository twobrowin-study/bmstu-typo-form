/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wsvcmoq1q4l6w2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dcnc01dj",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wsvcmoq1q4l6w2")

  // remove
  collection.schema.removeField("dcnc01dj")

  return dao.saveCollection(collection)
})
