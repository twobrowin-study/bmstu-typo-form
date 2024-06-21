/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n")

  collection.options = {
    "query": "SELECT \n  o.id as id,\n  ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o"
  }

  // remove
  collection.schema.removeField("pfwxu6xh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lijuleon",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n")

  collection.options = {
    "query": "SELECT \n  o.id as id,\n  ROUND(o.circulation*1.06+6,0) as estimated_circulation\nFROM orders o"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pfwxu6xh",
    "name": "estimated_circulation",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("lijuleon")

  return dao.saveCollection(collection)
})
