/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gq0cdj9ta2cbq35")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2tqbxxcw",
    "name": "title_1",
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
  const collection = dao.findCollectionByNameOrId("gq0cdj9ta2cbq35")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2tqbxxcw",
    "name": "title",
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
})
