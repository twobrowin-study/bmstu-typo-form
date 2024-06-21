/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wh0d3nkuokqcta5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "saovmrbf",
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
  const collection = dao.findCollectionByNameOrId("wh0d3nkuokqcta5")

  // remove
  collection.schema.removeField("saovmrbf")

  return dao.saveCollection(collection)
})
