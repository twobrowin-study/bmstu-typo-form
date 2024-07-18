/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  \"\" as non_avaliable_message\nFROM orders o,\n     cover_laminations cl\n"
  }

  // remove
  collection.schema.removeField("jxs2zld4")

  // remove
  collection.schema.removeField("p6tthq2m")

  // remove
  collection.schema.removeField("ppu80kvc")

  // remove
  collection.schema.removeField("p5mdwdry")

  // remove
  collection.schema.removeField("20dyz7sn")

  // remove
  collection.schema.removeField("ss7khscg")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     cover_laminations cl\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jxs2zld4",
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
    "id": "p6tthq2m",
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
    "id": "ppu80kvc",
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
    "id": "p5mdwdry",
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
    "id": "20dyz7sn",
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
    "id": "ss7khscg",
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

  return dao.saveCollection(collection)
})
