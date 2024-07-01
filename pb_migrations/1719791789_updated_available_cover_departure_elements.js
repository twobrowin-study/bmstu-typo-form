/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fpp5sd24bya0kh")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  o.id as order_id,\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o"
  }

  // remove
  collection.schema.removeField("lnbblshi")

  // remove
  collection.schema.removeField("cpmuhdgd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pa1ntliq",
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
    "id": "kia9tvv7",
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
    "id": "1ag6avoy",
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
  const collection = dao.findCollectionByNameOrId("0fpp5sd24bya0kh")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lnbblshi",
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
    "id": "cpmuhdgd",
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
  collection.schema.removeField("pa1ntliq")

  // remove
  collection.schema.removeField("kia9tvv7")

  // remove
  collection.schema.removeField("1ag6avoy")

  return dao.saveCollection(collection)
})
