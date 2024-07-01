/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "umqx4mx1",
    "name": "printer",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wh0d3nkuokqcta5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  // remove
  collection.schema.removeField("umqx4mx1")

  return dao.saveCollection(collection)
})
