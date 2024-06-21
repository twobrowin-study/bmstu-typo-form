/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6lws3vcqcvs3ewy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4uqwgunu",
    "name": "max_page_num",
    "type": "number",
    "required": false,
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

  // update
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
})
