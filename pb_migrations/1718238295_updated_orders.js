/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqjj2mpzk0zikk1")

  // remove
  collection.schema.removeField("qcr8ho06")

  // remove
  collection.schema.removeField("jqjfwstn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lv6uvfbi",
    "name": "block_printer",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wh0d3nkuokqcta5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ap182sz",
    "name": "cover_printer",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wh0d3nkuokqcta5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqjj2mpzk0zikk1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcr8ho06",
    "name": "block_printer",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Цифра",
        "Ризограф"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqjfwstn",
    "name": "cover_printer",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Цифра",
        "Ризограф"
      ]
    }
  }))

  // remove
  collection.schema.removeField("lv6uvfbi")

  // remove
  collection.schema.removeField("8ap182sz")

  return dao.saveCollection(collection)
})
