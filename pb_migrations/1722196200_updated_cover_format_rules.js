/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v047evpkz5bi2zn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c933q7uq",
    "name": "lamintaion_work_speed",
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
  const collection = dao.findCollectionByNameOrId("v047evpkz5bi2zn")

  // remove
  collection.schema.removeField("c933q7uq")

  return dao.saveCollection(collection)
})
