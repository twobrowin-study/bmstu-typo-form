/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic")

  collection.options = {
    "query": "SELECT id from orders"
  }

  // remove
  collection.schema.removeField("ts3tmydt")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic")

  collection.options = {
    "query": "SELECT o.id as id, ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ts3tmydt",
    "name": "estimated_circulation",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
})
