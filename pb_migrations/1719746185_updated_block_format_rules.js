/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  collection.name = "block_paper_rules"
  collection.listRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tsflifrp",
    "name": "paper_w_departure_elements",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1nybgccl",
    "name": "paper_wo_departure_elements",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uy7aqpvibsx05rx")

  collection.name = "block_format_rules"
  collection.listRule = ""

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tsflifrp",
    "name": "format_w_departure_elements",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1nybgccl",
    "name": "format_wo_departure_elements",
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

  return dao.saveCollection(collection)
})
