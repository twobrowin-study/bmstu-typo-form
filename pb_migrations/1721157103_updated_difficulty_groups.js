/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgria5csrq3owum")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "abobfvop",
    "name": "title",
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
  const collection = dao.findCollectionByNameOrId("cgria5csrq3owum")

  // remove
  collection.schema.removeField("abobfvop")

  return dao.saveCollection(collection)
})
