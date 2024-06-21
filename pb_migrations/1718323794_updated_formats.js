/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b87t9sg6",
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
  const collection = dao.findCollectionByNameOrId("rtvjsbojf2znktb")

  // remove
  collection.schema.removeField("b87t9sg6")

  return dao.saveCollection(collection)
})
