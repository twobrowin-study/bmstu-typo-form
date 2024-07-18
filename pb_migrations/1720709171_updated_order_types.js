/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0s1sde0f",
    "name": "cover_name",
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
  const collection = dao.findCollectionByNameOrId("1f5ieiczr37cglw")

  // remove
  collection.schema.removeField("0s1sde0f")

  return dao.saveCollection(collection)
})
