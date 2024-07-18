/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  \"\" as non_available_message\nFROM orders o,\n     cover_laminations cl\n"
  }

  // remove
  collection.schema.removeField("6iexspub")

  // remove
  collection.schema.removeField("d8l76l7c")

  // remove
  collection.schema.removeField("yklqscuw")

  // remove
  collection.schema.removeField("5vj6jspp")

  // remove
  collection.schema.removeField("6qtil7pt")

  // remove
  collection.schema.removeField("7okapytm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dncemft1",
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
    "id": "8ffq6xvm",
    "name": "cover_lamination_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1wsvcmoq1q4l6w2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "od9uywe8",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8jt7ogve",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e5ywizxk",
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
    "id": "xr4k5pvw",
    "name": "non_available_message",
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
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  \"\" as non_avaliable_message\nFROM orders o,\n     cover_laminations cl\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6iexspub",
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
    "id": "d8l76l7c",
    "name": "cover_lamination_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1wsvcmoq1q4l6w2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yklqscuw",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5vj6jspp",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6qtil7pt",
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
    "id": "7okapytm",
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
  collection.schema.removeField("dncemft1")

  // remove
  collection.schema.removeField("8ffq6xvm")

  // remove
  collection.schema.removeField("od9uywe8")

  // remove
  collection.schema.removeField("8jt7ogve")

  // remove
  collection.schema.removeField("e5ywizxk")

  // remove
  collection.schema.removeField("xr4k5pvw")

  return dao.saveCollection(collection)
})
