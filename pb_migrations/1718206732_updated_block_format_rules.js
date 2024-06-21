/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w5hoxu0a",
    "name": "format_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "rtvjsbojf2znktb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  // remove
  collection.schema.removeField("w5hoxu0a")

  return dao.saveCollection(collection)
})
