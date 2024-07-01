/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  // remove
  collection.schema.removeField("plhj95aj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sfxk4ayl",
    "name": "color",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "yuf9jzkx4zs4mwb",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "plhj95aj",
    "name": "fasterning",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6lws3vcqcvs3ewy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("sfxk4ayl")

  return dao.saveCollection(collection)
})
