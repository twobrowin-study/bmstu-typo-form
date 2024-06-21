/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  block_colors.name as block_color,\n  cover_colors.name as cover_color,\n  o.block_departure_elements as block_departure_elements,\n  o.cover_departure_elements as cover_departure_elements,\n  block_papers.name as block_paper,\n  cover_papers.name as cover_paper,\n  block_printers.name as block_printer,\n  cover_printers.name as cover_printer,\n  o.cover_lamination as cover_lamination,\n  o.block_multiplicity as block_multiplicity,\n  o.block_format as block_format,\n  o.cover_multiplicity as cover_multiplicity,\n  o.cover_format as cover_format,\n  o.appended_transparent_elements as appended_transparent_elements,\n  pc.estimated_circulation as estimated_circulation,\n  ceiling((o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // remove
  collection.schema.removeField("amlq57jg")

  // remove
  collection.schema.removeField("htlkvgen")

  // remove
  collection.schema.removeField("s5ehm12g")

  // remove
  collection.schema.removeField("fv0gk8iy")

  // remove
  collection.schema.removeField("poctv4ml")

  // remove
  collection.schema.removeField("xwoivmjv")

  // remove
  collection.schema.removeField("ihdhwdtz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dlpovvis",
    "name": "title",
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
    "id": "g0pqlpy8",
    "name": "ext_order_num",
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
    "id": "tiz20wpz",
    "name": "circulation",
    "type": "number",
    "required": false,
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
    "id": "cxwqs3c9",
    "name": "format",
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
    "id": "etrupm0g",
    "name": "page_num",
    "type": "number",
    "required": false,
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
    "id": "0sz5rav2",
    "name": "fastening",
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
    "id": "xasouucw",
    "name": "block_color",
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
    "id": "khf7ylzw",
    "name": "cover_color",
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
    "id": "kbrixm2d",
    "name": "block_departure_elements",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pmj4hlvx",
    "name": "cover_departure_elements",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "osvinhfy",
    "name": "block_paper",
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
    "id": "ebk22uuf",
    "name": "cover_paper",
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
    "id": "pccwqzdg",
    "name": "block_printer",
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
    "id": "gcpk9uxb",
    "name": "cover_printer",
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
    "id": "fdgunfcx",
    "name": "cover_lamination",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7hh9682t",
    "name": "block_multiplicity",
    "type": "number",
    "required": false,
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
    "id": "dob6qwzy",
    "name": "block_format",
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
    "id": "8xr7q2ji",
    "name": "cover_multiplicity",
    "type": "number",
    "required": false,
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
    "id": "whxqsldl",
    "name": "cover_format",
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
    "id": "c1pukdy5",
    "name": "appended_transparent_elements",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mbszp8pp",
    "name": "estimated_circulation",
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
    "id": "8seymxbs",
    "name": "block_paper_outgo",
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
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  f.name as format,\n  o.page_num as page_num,\n  pc.estimated_circulation as estimated_circulation,\n  ceiling((o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo\nFROM orders o, pre_calc pc, formats f\nWHERE o.id = pc.id\nAND   f.id = o.format"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "amlq57jg",
    "name": "title",
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
    "id": "htlkvgen",
    "name": "ext_order_num",
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
    "id": "s5ehm12g",
    "name": "circulation",
    "type": "number",
    "required": false,
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
    "id": "fv0gk8iy",
    "name": "format",
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
    "id": "poctv4ml",
    "name": "page_num",
    "type": "number",
    "required": false,
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
    "id": "xwoivmjv",
    "name": "estimated_circulation",
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
    "id": "ihdhwdtz",
    "name": "block_paper_outgo",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("dlpovvis")

  // remove
  collection.schema.removeField("g0pqlpy8")

  // remove
  collection.schema.removeField("tiz20wpz")

  // remove
  collection.schema.removeField("cxwqs3c9")

  // remove
  collection.schema.removeField("etrupm0g")

  // remove
  collection.schema.removeField("0sz5rav2")

  // remove
  collection.schema.removeField("xasouucw")

  // remove
  collection.schema.removeField("khf7ylzw")

  // remove
  collection.schema.removeField("kbrixm2d")

  // remove
  collection.schema.removeField("pmj4hlvx")

  // remove
  collection.schema.removeField("osvinhfy")

  // remove
  collection.schema.removeField("ebk22uuf")

  // remove
  collection.schema.removeField("pccwqzdg")

  // remove
  collection.schema.removeField("gcpk9uxb")

  // remove
  collection.schema.removeField("fdgunfcx")

  // remove
  collection.schema.removeField("7hh9682t")

  // remove
  collection.schema.removeField("dob6qwzy")

  // remove
  collection.schema.removeField("8xr7q2ji")

  // remove
  collection.schema.removeField("whxqsldl")

  // remove
  collection.schema.removeField("c1pukdy5")

  // remove
  collection.schema.removeField("mbszp8pp")

  // remove
  collection.schema.removeField("8seymxbs")

  return dao.saveCollection(collection)
})
