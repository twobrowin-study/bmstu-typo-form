/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("st9p85stn0zj7fj")

  collection.options = {
    "query": "SELECT\n  concat(o.id, p.id) as id,\n  o.id as order_id,\n  p.id as format_id,\n  p.name as name,\n  p.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     papers p\nWHERE p.is_block_avaliable\nAND   o.block_printer = \"\""
  }

  // remove
  collection.schema.removeField("a47p45ej")

  // remove
  collection.schema.removeField("gtqoe9ta")

  // remove
  collection.schema.removeField("tg7wpnst")

  // remove
  collection.schema.removeField("rekucegv")

  // remove
  collection.schema.removeField("v4ugaduu")

  // remove
  collection.schema.removeField("6qg2bzgz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j6ynngx9",
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
    "id": "pnn7bdj4",
    "name": "format_id",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d66qatty",
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
    "id": "j1qfzmus",
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
    "id": "xmp1oqxz",
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
    "id": "ap1zkq0j",
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
  const collection = dao.findCollectionByNameOrId("st9p85stn0zj7fj")

  collection.options = {
    "query": "SELECT\n  concat(o.id, p.id) as id,\n  o.id as order_id,\n  p.id as format_id,\n  p.name as name,\n  p.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     papers p\nWHERE p.is_block_avaliable"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a47p45ej",
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
    "id": "gtqoe9ta",
    "name": "format_id",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tg7wpnst",
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
    "id": "rekucegv",
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
    "id": "v4ugaduu",
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
    "id": "6qg2bzgz",
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
  collection.schema.removeField("j6ynngx9")

  // remove
  collection.schema.removeField("pnn7bdj4")

  // remove
  collection.schema.removeField("d66qatty")

  // remove
  collection.schema.removeField("j1qfzmus")

  // remove
  collection.schema.removeField("xmp1oqxz")

  // remove
  collection.schema.removeField("ap1zkq0j")

  return dao.saveCollection(collection)
})
