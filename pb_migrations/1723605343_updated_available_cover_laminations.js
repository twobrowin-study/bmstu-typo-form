/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_available,\n  \"\" as non_available_message,\n  cl.is_empty as is_default\nFROM orders o,\n     cover_laminations cl\n"
  }

  // remove
  collection.schema.removeField("dj7hvhak")

  // remove
  collection.schema.removeField("vqvkbclq")

  // remove
  collection.schema.removeField("xtnfbezb")

  // remove
  collection.schema.removeField("jzjcey0q")

  // remove
  collection.schema.removeField("59xfbvvs")

  // remove
  collection.schema.removeField("wcr3emao")

  // remove
  collection.schema.removeField("ial9nard")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kybjivgx",
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
    "id": "t4wxusau",
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
    "id": "ldxprviv",
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
    "id": "bhn4muah",
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
    "id": "olmwpvvo",
    "name": "is_available",
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
    "id": "fcatwgh6",
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
    "id": "knu3xj1z",
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
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  \"\" as non_available_message,\n  cl.is_empty as is_default\nFROM orders o,\n     cover_laminations cl\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dj7hvhak",
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
    "id": "vqvkbclq",
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
    "id": "xtnfbezb",
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
    "id": "jzjcey0q",
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
    "id": "59xfbvvs",
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
    "id": "wcr3emao",
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
    "id": "ial9nard",
    "name": "is_default",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("kybjivgx")

  // remove
  collection.schema.removeField("t4wxusau")

  // remove
  collection.schema.removeField("ldxprviv")

  // remove
  collection.schema.removeField("bhn4muah")

  // remove
  collection.schema.removeField("olmwpvvo")

  // remove
  collection.schema.removeField("fcatwgh6")

  // remove
  collection.schema.removeField("knu3xj1z")

  return dao.saveCollection(collection)
})
