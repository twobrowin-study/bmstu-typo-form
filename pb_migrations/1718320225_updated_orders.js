/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wqjj2mpzk0zikk1")

  // remove
  collection.schema.removeField("79klm2dy")

  // remove
  collection.schema.removeField("m5ztrmnf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nwkxqbhe",
    "name": "block_color",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "yuf9jzkx4zs4mwb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvxtro8q",
    "name": "block_paper",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "gq0cdj9ta2cbq35",
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
    "id": "79klm2dy",
    "name": "block_color",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "otyj355fus3kaxb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m5ztrmnf",
    "name": "block_paper",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wo478d0kqiy4j48",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("nwkxqbhe")

  // remove
  collection.schema.removeField("mvxtro8q")

  return dao.saveCollection(collection)
})
