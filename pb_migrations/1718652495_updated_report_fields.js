/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wm1axh9lep4pro4")

  // remove
  collection.schema.removeField("2h016hyj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "irb7rxxn",
    "name": "section",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Заказ",
        "Выходные форматы",
        "Материалы",
        "Работы"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wm1axh9lep4pro4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2h016hyj",
    "name": "section",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "nafzd23cgj1s6d3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("irb7rxxn")

  return dao.saveCollection(collection)
})
