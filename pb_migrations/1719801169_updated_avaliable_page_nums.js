/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o80eej583nd4h5a")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  \"min\",\n  \"max\",\n  step\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    NULL as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step\n  FROM orders o\n  WHERE o.format = \"\"\n  OR    o.fastening = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    8 as \"min\",\n    (CASE\n      WHEN fr.is_brace THEN f.brace_max_pages\n      ELSE NULL \n    END) as \"max\",\n    (CASE\n      WHEN o.page_num <= 64 THEN 4\n      ELSE 2\n    END) as step\n  FROM orders o,\n      formats f,\n      fastenings fr\n  WHERE f.id = o.format\n  OR    fr.id = o.fastening\n)"
  }

  // remove
  collection.schema.removeField("bbrhm3kp")

  // remove
  collection.schema.removeField("ivbidqao")

  // remove
  collection.schema.removeField("b2ovgxqn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zfo6mbdu",
    "name": "order_id",
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
    "id": "2aqkxwge",
    "name": "min",
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
    "id": "bnkyypjb",
    "name": "max",
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
    "id": "gvrfy1s4",
    "name": "step",
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
  const collection = dao.findCollectionByNameOrId("o80eej583nd4h5a")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  o.id as order_id,\n  8 as \"min\",\n  (CASE\n    WHEN o.page_num <= 64 THEN 4\n    ELSE 2\n  END) as step\nFROM orders o"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bbrhm3kp",
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
    "id": "ivbidqao",
    "name": "min",
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
    "id": "b2ovgxqn",
    "name": "step",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("zfo6mbdu")

  // remove
  collection.schema.removeField("2aqkxwge")

  // remove
  collection.schema.removeField("bnkyypjb")

  // remove
  collection.schema.removeField("gvrfy1s4")

  return dao.saveCollection(collection)
})
