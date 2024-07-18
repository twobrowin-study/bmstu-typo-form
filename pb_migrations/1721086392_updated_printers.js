/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wh0d3nkuokqcta5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ihxwgon3",
    "name": "is_digital_color",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wh0d3nkuokqcta5")

  // remove
  collection.schema.removeField("ihxwgon3")

  return dao.saveCollection(collection)
})
