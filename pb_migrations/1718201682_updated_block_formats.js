/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  // remove
  collection.schema.removeField("smabrvzp")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smabrvzp",
    "name": "fastening_rule",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "Cкоба",
        "Полиуретан",
        "Термоклей",
        "Пружина пластиковая",
        "Пружина металлическая",
        "Cбоку на скобы"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
