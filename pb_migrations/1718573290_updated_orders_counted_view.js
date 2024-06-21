/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.name = "orders_counted"
  collection.options = {
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  block_colors.name as block_color,\n  cover_colors.name as cover_color,\n  o.block_departure_elements as block_departure_elements,\n  o.cover_departure_elements as cover_departure_elements,\n  block_papers.name as block_paper,\n  cover_papers.name as cover_paper,\n  block_printers.name as block_printer,\n  cover_printers.name as cover_printer,\n  o.cover_lamination as cover_lamination,\n  o.block_multiplicity as block_multiplicity,\n  o.block_format as block_format,\n  o.cover_multiplicity as cover_multiplicity,\n  o.cover_format as cover_format,\n  o.appended_transparent_elements as appended_transparent_elements,\n  pc.estimated_circulation as estimated_circulation,\n  (o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n  pc.estimated_circulation/o.cover_multiplicity as cover_paper_outgo,\n  (CASE\n    WHEN block_printers.is_digital AND block_colors.is_color THEN (o.page_num*pc.estimated_circulation)/(o.block_multiplicity)*32000\n    ELSE NULL\n  END) as block_digital_color_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_digital AND cover_colors.is_color THEN (2*pc.estimated_circulation)/(o.cover_multiplicity)*32000\n    ELSE NULL\n  END) as cover_digital_color_printer_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // remove
  collection.schema.removeField("0k5zaqtz")

  // remove
  collection.schema.removeField("odukty29")

  // remove
  collection.schema.removeField("d3yyzhfo")

  // remove
  collection.schema.removeField("wku5rtfe")

  // remove
  collection.schema.removeField("xdktyz6s")

  // remove
  collection.schema.removeField("wsbtrcvj")

  // remove
  collection.schema.removeField("9kabrnac")

  // remove
  collection.schema.removeField("7yqee7f3")

  // remove
  collection.schema.removeField("3qcajzvx")

  // remove
  collection.schema.removeField("ldln2ita")

  // remove
  collection.schema.removeField("4fkx747z")

  // remove
  collection.schema.removeField("bxxrtmyt")

  // remove
  collection.schema.removeField("mi2oq0ou")

  // remove
  collection.schema.removeField("azognhes")

  // remove
  collection.schema.removeField("es6fcrpu")

  // remove
  collection.schema.removeField("fkopmq1e")

  // remove
  collection.schema.removeField("xheyxoxs")

  // remove
  collection.schema.removeField("tep0zzd2")

  // remove
  collection.schema.removeField("lxrptkii")

  // remove
  collection.schema.removeField("zsxwdkvb")

  // remove
  collection.schema.removeField("e2skrich")

  // remove
  collection.schema.removeField("er8rulmt")

  // remove
  collection.schema.removeField("kg5ohle6")

  // remove
  collection.schema.removeField("ods5r8lo")

  // remove
  collection.schema.removeField("wbowqrng")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjqoqnu9",
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
    "id": "f0yfvbyq",
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
    "id": "uhvd6x2w",
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
    "id": "9ekd1uvb",
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
    "id": "zgblkte0",
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
    "id": "no1swl0u",
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
    "id": "stsh46k5",
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
    "id": "zxvwu4cg",
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
    "id": "pr3vebne",
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
    "id": "shtaj8nx",
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
    "id": "wifn9lop",
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
    "id": "fr0f3yhe",
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
    "id": "jwgskbz5",
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
    "id": "amalzkas",
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
    "id": "fthwitn7",
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
    "id": "s4xfsbtv",
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
    "id": "ym2xaurp",
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
    "id": "ywopf4br",
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
    "id": "w5kdfvmv",
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
    "id": "bvqwwc8p",
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
    "id": "6tfihrge",
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
    "id": "twzpt6fl",
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
    "id": "r9araevr",
    "name": "cover_paper_outgo",
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
    "id": "4xtyttfx",
    "name": "block_digital_color_printer_outgo",
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
    "id": "dupkjfk5",
    "name": "cover_digital_color_printer_outgo",
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

  collection.name = "orders_counted_view"
  collection.options = {
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  block_colors.name as block_color,\n  cover_colors.name as cover_color,\n  o.block_departure_elements as block_departure_elements,\n  o.cover_departure_elements as cover_departure_elements,\n  block_papers.name as block_paper,\n  cover_papers.name as cover_paper,\n  block_printers.name as block_printer,\n  cover_printers.name as cover_printer,\n  o.cover_lamination as cover_lamination,\n  o.block_multiplicity as block_multiplicity,\n  o.block_format as block_format,\n  o.cover_multiplicity as cover_multiplicity,\n  o.cover_format as cover_format,\n  o.appended_transparent_elements as appended_transparent_elements,\n  pc.estimated_circulation as estimated_circulation,\n  concat(block_papers.name, ' ', o.block_format) as block_full_paper_name,\n  ceiling(\n    (o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity) + \n    (CASE\n      WHEN o.cover_paper = o.block_paper THEN pc.estimated_circulation/o.cover_multiplicity\n      ELSE 0\n    END)\n  ) as block_paper_outgo,\n  (CASE\n    WHEN o.cover_paper != o.block_paper THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as cover_full_paper_name,\n  (CASE\n    WHEN o.cover_paper != o.block_paper THEN pc.estimated_circulation/o.cover_multiplicity\n    ELSE NULL\n  END) as cover_paper_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0k5zaqtz",
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
    "id": "odukty29",
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
    "id": "d3yyzhfo",
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
    "id": "wku5rtfe",
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
    "id": "xdktyz6s",
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
    "id": "wsbtrcvj",
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
    "id": "9kabrnac",
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
    "id": "7yqee7f3",
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
    "id": "3qcajzvx",
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
    "id": "ldln2ita",
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
    "id": "4fkx747z",
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
    "id": "bxxrtmyt",
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
    "id": "mi2oq0ou",
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
    "id": "azognhes",
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
    "id": "es6fcrpu",
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
    "id": "fkopmq1e",
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
    "id": "xheyxoxs",
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
    "id": "tep0zzd2",
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
    "id": "lxrptkii",
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
    "id": "zsxwdkvb",
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
    "id": "e2skrich",
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
    "id": "er8rulmt",
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
    "id": "kg5ohle6",
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
    "id": "ods5r8lo",
    "name": "cover_full_paper_name",
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
    "id": "wbowqrng",
    "name": "cover_paper_outgo",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("sjqoqnu9")

  // remove
  collection.schema.removeField("f0yfvbyq")

  // remove
  collection.schema.removeField("uhvd6x2w")

  // remove
  collection.schema.removeField("9ekd1uvb")

  // remove
  collection.schema.removeField("zgblkte0")

  // remove
  collection.schema.removeField("no1swl0u")

  // remove
  collection.schema.removeField("stsh46k5")

  // remove
  collection.schema.removeField("zxvwu4cg")

  // remove
  collection.schema.removeField("pr3vebne")

  // remove
  collection.schema.removeField("shtaj8nx")

  // remove
  collection.schema.removeField("wifn9lop")

  // remove
  collection.schema.removeField("fr0f3yhe")

  // remove
  collection.schema.removeField("jwgskbz5")

  // remove
  collection.schema.removeField("amalzkas")

  // remove
  collection.schema.removeField("fthwitn7")

  // remove
  collection.schema.removeField("s4xfsbtv")

  // remove
  collection.schema.removeField("ym2xaurp")

  // remove
  collection.schema.removeField("ywopf4br")

  // remove
  collection.schema.removeField("w5kdfvmv")

  // remove
  collection.schema.removeField("bvqwwc8p")

  // remove
  collection.schema.removeField("6tfihrge")

  // remove
  collection.schema.removeField("twzpt6fl")

  // remove
  collection.schema.removeField("r9araevr")

  // remove
  collection.schema.removeField("4xtyttfx")

  // remove
  collection.schema.removeField("dupkjfk5")

  return dao.saveCollection(collection)
})
