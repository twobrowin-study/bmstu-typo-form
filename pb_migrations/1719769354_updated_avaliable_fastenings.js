/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  f.id as fastening_id,\n  f.name as name,\n  f.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     fastenings f\nWHERE o.format ISNULL OR NOT f.is_brace\n"
  }

  // remove
  collection.schema.removeField("rdtmpueh")

  // remove
  collection.schema.removeField("uawivz1s")

  // remove
  collection.schema.removeField("ol0sgqsl")

  // remove
  collection.schema.removeField("393kenxk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fq9rnory",
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
    "id": "e3mt7sal",
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
    "id": "5mrnk2hq",
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
    "id": "52vstara",
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
    "id": "f1x2ugno",
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
    "id": "vzv8ee3p",
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
    "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  f.id as fastening_id,\n  f.name as fastening_name,\n  f.\"order\" as fastening_order\nFROM orders o,\n     fastenings f\nWHERE o.format ISNULL"
  }

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

  // remove
  collection.schema.removeField("fq9rnory")

  // remove
  collection.schema.removeField("e3mt7sal")

  // remove
  collection.schema.removeField("5mrnk2hq")

  // remove
  collection.schema.removeField("52vstara")

  // remove
  collection.schema.removeField("f1x2ugno")

  // remove
  collection.schema.removeField("vzv8ee3p")

  return dao.saveCollection(collection)
})
