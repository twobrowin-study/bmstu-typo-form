/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format,\n  cfr.multiplicity as cover_multiplicity,\n  (CASE\n    WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n    ELSE cfr.format_wo_departure_elements\n  END) as cover_format\nFROM orders o,\n     block_format_rules bfr,\n     cover_format_rules cfr,\n     json_each(cfr.fasterning) as cfr_fasterning\nWHERE bfr.format = o.format\nAND   cfr.format = o.format\nAND   cfr_fasterning.value = o.fastening"
  }

  // remove
  collection.schema.removeField("ytuaqk22")

  // remove
  collection.schema.removeField("yrjrjuba")

  // remove
  collection.schema.removeField("w3kzyzih")

  // remove
  collection.schema.removeField("eevuqzmf")

  // remove
  collection.schema.removeField("lpul1vf0")

  // remove
  collection.schema.removeField("yuqrg1b4")

  // remove
  collection.schema.removeField("vxoef9je")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wwmhfmlx",
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
    "id": "w2ez8in4",
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
    "id": "3x2gciei",
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
    "id": "gm64qlpe",
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
    "query": "SELECT\n  o.id as id,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format,\n  cfr.id as cfr_id,\n  cfr_fasterning.value as cfr_fasterning,\n  o.fastening as o_fastening,\n  cfr.multiplicity as cover_multiplicity,\n  (CASE\n    WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n    ELSE cfr.format_wo_departure_elements\n  END) as cover_format\nFROM orders o,\n     block_format_rules bfr,\n     cover_format_rules cfr,\n     json_each(cfr.fasterning) as cfr_fasterning\nWHERE bfr.format = o.format\nAND   cfr.format = o.format\nAND   cfr_fasterning.value = o.fastening"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ytuaqk22",
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
    "id": "yrjrjuba",
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
    "id": "w3kzyzih",
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
    "id": "eevuqzmf",
    "name": "cfr_fasterning",
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
    "id": "lpul1vf0",
    "name": "o_fastening",
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
    "id": "yuqrg1b4",
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
    "id": "vxoef9je",
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
  collection.schema.removeField("wwmhfmlx")

  // remove
  collection.schema.removeField("w2ez8in4")

  // remove
  collection.schema.removeField("3x2gciei")

  // remove
  collection.schema.removeField("gm64qlpe")

  return dao.saveCollection(collection)
})
