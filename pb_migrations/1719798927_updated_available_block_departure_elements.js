/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gwwts3f34x3bwun")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  o.id as order_id,\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o"
  }

  // remove
  collection.schema.removeField("c3thxflj")

  // remove
  collection.schema.removeField("exhyctjn")

  // remove
  collection.schema.removeField("ksiihgex")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iz0cpsih",
    "name": "order_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wqjj2mpzk0zikk1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v0htm1kf",
    "name": "is_avaliable",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0ako4szk",
    "name": "non_avaliable_message",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gwwts3f34x3bwun")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  o.id as order_id,\n  FALSE as is_avaliable,\n  ' - не доступно' as non_avaliable_message\nFROM orders o"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c3thxflj",
    "name": "order_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wqjj2mpzk0zikk1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "exhyctjn",
    "name": "is_avaliable",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ksiihgex",
    "name": "non_avaliable_message",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("iz0cpsih")

  // remove
  collection.schema.removeField("v0htm1kf")

  // remove
  collection.schema.removeField("0ako4szk")

  return dao.saveCollection(collection)
})
