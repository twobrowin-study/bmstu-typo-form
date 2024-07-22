/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  \"\" as non_available_message,\n  cl.is_empty as is_default\nFROM orders o,\n     cover_laminations cl\n"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iyme4yas",
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
    "id": "fhpdmxkk",
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
    "id": "lerce4ij",
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
    "id": "f2m3fzli",
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
    "id": "txn7pee1",
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
    "id": "6gojcpgq",
    "name": "non_available_message",
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
    "id": "hxcv9pxi",
    "name": "is_default",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  \"\" as non_available_message\nFROM orders o,\n     cover_laminations cl\n"
  }

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

  // remove
  collection.schema.removeField("iyme4yas")

  // remove
  collection.schema.removeField("fhpdmxkk")

  // remove
  collection.schema.removeField("lerce4ij")

  // remove
  collection.schema.removeField("f2m3fzli")

  // remove
  collection.schema.removeField("txn7pee1")

  // remove
  collection.schema.removeField("6gojcpgq")

  // remove
  collection.schema.removeField("hxcv9pxi")

  return dao.saveCollection(collection)
})