/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  f.id as fastening_id,\n  f.name as fastening_name,\n  f.\"order\" as fastening_order\nFROM orders o,\n     fastenings f\nWHERE o.format ISNULL"
  }

  // remove
  collection.schema.removeField("yvnvsbwa")

  // remove
  collection.schema.removeField("4pcqj4md")

  // remove
  collection.schema.removeField("tjdjiq5p")

  // remove
  collection.schema.removeField("nzrofltt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rdtmpueh",
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
    "id": "uawivz1s",
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
    "id": "ol0sgqsl",
    "name": "fastening_name",
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
    "id": "393kenxk",
    "name": "fastening_order",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  concat(o.id, fastenings.id) as id,\n  o.id as order_id,\n  fastenings.id as fastening_id,\n  fastenings.name as fastening_name,\n  fastenings.\"order\" as fastening_order\nFROM orders o,\n     fastenings"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yvnvsbwa",
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
    "id": "4pcqj4md",
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
    "id": "tjdjiq5p",
    "name": "fastening_name",
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
    "id": "nzrofltt",
    "name": "fastening_order",
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

  // remove
  collection.schema.removeField("rdtmpueh")

  // remove
  collection.schema.removeField("uawivz1s")

  // remove
  collection.schema.removeField("ol0sgqsl")

  // remove
  collection.schema.removeField("393kenxk")

  return dao.saveCollection(collection)
})
