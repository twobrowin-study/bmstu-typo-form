/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v047evpkz5bi2zn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "famds6kf",
    "name": "format",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "txjzd88w",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v047evpkz5bi2zn")

  // remove
  collection.schema.removeField("famds6kf")

  // remove
  collection.schema.removeField("txjzd88w")

  return dao.saveCollection(collection)
})