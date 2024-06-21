/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  block_colors.name as block_color,\n  cover_colors.name as cover_color,\n  o.block_departure_elements as block_departure_elements,\n  o.cover_departure_elements as cover_departure_elements,\n  block_papers.name as block_paper,\n  cover_papers.name as cover_paper,\n  block_printers.name as block_printer,\n  cover_printers.name as cover_printer,\n  o.cover_lamination as cover_lamination,\n  o.block_multiplicity as block_multiplicity,\n  o.block_format as block_format,\n  o.cover_multiplicity as cover_multiplicity,\n  o.cover_format as cover_format,\n  o.appended_transparent_elements as appended_transparent_elements,\n  pc.estimated_circulation as estimated_circulation,\n  concat(block_papers.name, ' ', o.block_format) as block_full_paper_name,\n  ceiling((o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo,\n  (CASE\n    WHEN o.cover_paper != o.block_paper THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as cover_full_paper_name\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // remove
  collection.schema.removeField("vqttvufb")

  // remove
  collection.schema.removeField("ghgjwdjf")

  // remove
  collection.schema.removeField("vvk6c5pi")

  // remove
  collection.schema.removeField("nfghkxdc")

  // remove
  collection.schema.removeField("qmb9qofw")

  // remove
  collection.schema.removeField("cavwg5lm")

  // remove
  collection.schema.removeField("herxcwxu")

  // remove
  collection.schema.removeField("r9ftabud")

  // remove
  collection.schema.removeField("w1urw9fl")

  // remove
  collection.schema.removeField("hjvz7090")

  // remove
  collection.schema.removeField("s1pdgdhu")

  // remove
  collection.schema.removeField("odacvdkj")

  // remove
  collection.schema.removeField("pxttwji2")

  // remove
  collection.schema.removeField("9l7fchj7")

  // remove
  collection.schema.removeField("5yrpwpbo")

  // remove
  collection.schema.removeField("8h6nvh8g")

  // remove
  collection.schema.removeField("q3qnwig7")

  // remove
  collection.schema.removeField("zcrwnqi5")

  // remove
  collection.schema.removeField("ezzxrqr2")

  // remove
  collection.schema.removeField("nzekzqs0")

  // remove
  collection.schema.removeField("4g3ydtrq")

  // remove
  collection.schema.removeField("7gtc5b09")

  // remove
  collection.schema.removeField("3vn9may2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kictednd",
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
    "id": "tktvtsz0",
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
    "id": "njkczfyw",
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
    "id": "tog4nhiq",
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
    "id": "kylr0iap",
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
    "id": "ama9jabt",
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
    "id": "8qzbzhlt",
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
    "id": "1brdfqd0",
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
    "id": "jj1rc0xi",
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
    "id": "e2lg30fp",
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
    "id": "zpqxzhgc",
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
    "id": "bke9wgwx",
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
    "id": "plgegxvc",
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
    "id": "bjsahu7w",
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
    "id": "8gzmn7r9",
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
    "id": "l5f1hm2s",
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
    "id": "lruotra0",
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
    "id": "nl08eptp",
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
    "id": "gptbsts2",
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
    "id": "rkzsaxvs",
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
    "id": "vuzwoado",
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
    "id": "syftgpex",
    "name": "block_full_paper_name",
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
    "id": "0samqnhs",
    "name": "block_paper_outgo",
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
    "id": "axcanu5a",
    "name": "cover_full_paper_name",
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
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  block_colors.name as block_color,\n  cover_colors.name as cover_color,\n  o.block_departure_elements as block_departure_elements,\n  o.cover_departure_elements as cover_departure_elements,\n  block_papers.name as block_paper,\n  cover_papers.name as cover_paper,\n  block_printers.name as block_printer,\n  cover_printers.name as cover_printer,\n  o.cover_lamination as cover_lamination,\n  o.block_multiplicity as block_multiplicity,\n  o.block_format as block_format,\n  o.cover_multiplicity as cover_multiplicity,\n  o.cover_format as cover_format,\n  o.appended_transparent_elements as appended_transparent_elements,\n  pc.estimated_circulation as estimated_circulation,\n  concat(block_papers.name, ' ', o.block_format) as block_full_paper_name,\n  ceiling((o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vqttvufb",
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
    "id": "ghgjwdjf",
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
    "id": "vvk6c5pi",
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
    "id": "nfghkxdc",
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
    "id": "qmb9qofw",
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
    "id": "cavwg5lm",
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
    "id": "herxcwxu",
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
    "id": "r9ftabud",
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
    "id": "w1urw9fl",
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
    "id": "hjvz7090",
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
    "id": "s1pdgdhu",
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
    "id": "odacvdkj",
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
    "id": "pxttwji2",
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
    "id": "9l7fchj7",
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
    "id": "5yrpwpbo",
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
    "id": "8h6nvh8g",
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
    "id": "q3qnwig7",
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
    "id": "zcrwnqi5",
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
    "id": "ezzxrqr2",
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
    "id": "nzekzqs0",
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
    "id": "4g3ydtrq",
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
    "id": "7gtc5b09",
    "name": "block_full_paper_name",
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
    "id": "3vn9may2",
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
  collection.schema.removeField("kictednd")

  // remove
  collection.schema.removeField("tktvtsz0")

  // remove
  collection.schema.removeField("njkczfyw")

  // remove
  collection.schema.removeField("tog4nhiq")

  // remove
  collection.schema.removeField("kylr0iap")

  // remove
  collection.schema.removeField("ama9jabt")

  // remove
  collection.schema.removeField("8qzbzhlt")

  // remove
  collection.schema.removeField("1brdfqd0")

  // remove
  collection.schema.removeField("jj1rc0xi")

  // remove
  collection.schema.removeField("e2lg30fp")

  // remove
  collection.schema.removeField("zpqxzhgc")

  // remove
  collection.schema.removeField("bke9wgwx")

  // remove
  collection.schema.removeField("plgegxvc")

  // remove
  collection.schema.removeField("bjsahu7w")

  // remove
  collection.schema.removeField("8gzmn7r9")

  // remove
  collection.schema.removeField("l5f1hm2s")

  // remove
  collection.schema.removeField("lruotra0")

  // remove
  collection.schema.removeField("nl08eptp")

  // remove
  collection.schema.removeField("gptbsts2")

  // remove
  collection.schema.removeField("rkzsaxvs")

  // remove
  collection.schema.removeField("vuzwoado")

  // remove
  collection.schema.removeField("syftgpex")

  // remove
  collection.schema.removeField("0samqnhs")

  // remove
  collection.schema.removeField("axcanu5a")

  return dao.saveCollection(collection)
})