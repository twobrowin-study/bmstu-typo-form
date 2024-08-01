/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pltm6xom",
    "name": "larger_size_mm",
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
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb")

  // remove
  collection.schema.removeField("pltm6xom")

  return dao.saveCollection(collection)
})
