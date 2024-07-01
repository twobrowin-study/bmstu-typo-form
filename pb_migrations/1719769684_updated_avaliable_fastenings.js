/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  json(o.format) as format,\n  f.id as fastening_id,\n  f.name as name,\n  f.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     fastenings f\nWHERE o.format ISNULL OR NOT f.is_brace\n"
  }

  // remove
  collection.schema.removeField("s4mx0fob")

  // remove
  collection.schema.removeField("n8woizrr")

  // remove
  collection.schema.removeField("fsuutbj1")

  // remove
  collection.schema.removeField("gtio93gm")

  // remove
  collection.schema.removeField("rv7ooovl")

  // remove
  collection.schema.removeField("trmsduga")

  // remove
  collection.schema.removeField("mzlglgea")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ez4fdcs",
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
    "id": "m8f1hrv3",
    "name": "format",
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
    "id": "sbt4jud4",
    "name": "fastening_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6lws3vcqcvs3ewy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mlpno283",
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
    "id": "vlgwtogh",
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
    "id": "6nctfugp",
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
    "id": "hijkdgae",
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
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  o.format as format,\n  f.id as fastening_id,\n  f.name as name,\n  f.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     fastenings f\nWHERE o.format ISNULL OR NOT f.is_brace\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s4mx0fob",
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
    "id": "n8woizrr",
    "name": "format",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "rtvjsbojf2znktb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsuutbj1",
    "name": "fastening_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6lws3vcqcvs3ewy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtio93gm",
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
    "id": "rv7ooovl",
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
    "id": "trmsduga",
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
    "id": "mzlglgea",
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
  collection.schema.removeField("9ez4fdcs")

  // remove
  collection.schema.removeField("m8f1hrv3")

  // remove
  collection.schema.removeField("sbt4jud4")

  // remove
  collection.schema.removeField("mlpno283")

  // remove
  collection.schema.removeField("vlgwtogh")

  // remove
  collection.schema.removeField("6nctfugp")

  // remove
  collection.schema.removeField("hijkdgae")

  return dao.saveCollection(collection)
})
