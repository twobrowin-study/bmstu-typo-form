/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format,\n  cfr.id as cfr_id,\n  cfr.multiplicity as cover_multiplicity,\n  (CASE\n    WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n    ELSE cfr.format_wo_departure_elements\n  END) as cover_format\nFROM orders o,\n     block_format_rules bfr,\n     cover_format_rules cfr\nWHERE bfr.format = o.format\nAND   cfr.format = o.format\nAND   cfr.fasterning = o.fastening"
  }

  // remove
  collection.schema.removeField("ydr1ggc3")

  // remove
  collection.schema.removeField("gwpakuj5")

  // remove
  collection.schema.removeField("9qtnycfr")

  // remove
  collection.schema.removeField("oxn71c2c")

  // remove
  collection.schema.removeField("nuq2xkg2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0auqvqbk",
    "name": "block_multiplicity",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5amqiuiv",
    "name": "block_format",
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
    "id": "pvtrqwxl",
    "name": "cfr_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "v047evpkz5bi2zn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "la7yveoh",
    "name": "cover_multiplicity",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q0o9tvfs",
    "name": "cover_format",
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
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format,\n  cfr.id as cfr_id,\n  cfr.multiplicity as cover_multiplicity,\n  (CASE\n    WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n    ELSE cfr.format_wo_departure_elements\n  END) as cover_format\nFROM orders o,\n     block_format_rules bfr,\n     cover_format_rules cfr\nWHERE bfr.format = o.format\nAND   cfr.format = o.format"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydr1ggc3",
    "name": "block_multiplicity",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwpakuj5",
    "name": "block_format",
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
    "id": "9qtnycfr",
    "name": "cfr_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "v047evpkz5bi2zn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oxn71c2c",
    "name": "cover_multiplicity",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nuq2xkg2",
    "name": "cover_format",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("0auqvqbk")

  // remove
  collection.schema.removeField("5amqiuiv")

  // remove
  collection.schema.removeField("pvtrqwxl")

  // remove
  collection.schema.removeField("la7yveoh")

  // remove
  collection.schema.removeField("q0o9tvfs")

  return dao.saveCollection(collection)
})
