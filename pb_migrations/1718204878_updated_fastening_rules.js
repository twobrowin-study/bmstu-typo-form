/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6lws3vcqcvs3ewy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otnydybr",
    "name": "format",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 6,
      "values": [
        "А5",
        "165*235",
        "170*240",
        "200*200",
        "205*290",
        "А4"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4uqwgunu",
    "name": "max_page_num",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6lws3vcqcvs3ewy")

  // remove
  collection.schema.removeField("otnydybr")

  // remove
  collection.schema.removeField("4uqwgunu")

  return dao.saveCollection(collection)
})
