/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v047evpkz5bi2zn")

  // remove
  collection.schema.removeField("cngyqmzd")

  // remove
  collection.schema.removeField("kpfeomsd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v047evpkz5bi2zn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cngyqmzd",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kpfeomsd",
    "name": "fastening_rule",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 6,
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
