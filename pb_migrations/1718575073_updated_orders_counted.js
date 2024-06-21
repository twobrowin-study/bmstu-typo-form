/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH pre_calc as (\n  WITH circulation_calc as (\n    SELECT\n      o.id as id,\n      ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n  )\n  SELECT\n    o.id as id,\n    cc.estimated_circulation as estimated_circulation,\n    (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    cc.estimated_circulation/o.cover_multiplicity as cover_paper_outgo\n  FROM orders o, circulation_calc cc\n  WHERE o.id = cc.id\n)\nSELECT \n  o.id as id,\n  pc.estimated_circulation as estimated_circulation,\n  pc.block_paper_outgo as block_paper_outgo,\n  pc.cover_paper_outgo cover_paper_outgo,\n  (CASE\n    WHEN block_printers.is_digital AND block_colors.is_color THEN ((2*pc.block_paper_outgo)/32000)*100\n    ELSE NULL\n  END) as block_digital_color_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_digital AND cover_colors.is_color THEN ((2*pc.cover_paper_outgo)/32000)*100\n    ELSE NULL\n  END) as cover_digital_color_printer_outgo,\n  (CASE\n    WHEN block_printers.is_digital AND NOT block_colors.is_color THEN ((2*pc.block_paper_outgo)/30000)*100\n    ELSE NULL\n  END) as block_digital_bw_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_digital AND NOT cover_colors.is_color THEN ((2*pc.cover_paper_outgo)/30000)*100\n    ELSE NULL\n  END) as cover_digital_bw_printer_outgo,\n  (CASE\n    WHEN block_printers.is_risograph AND NOT block_colors.is_color THEN ((2*pc.block_paper_outgo)/14000)*100\n    ELSE NULL\n  END) as block_risograph_bw_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_risograph AND NOT cover_colors.is_color THEN ((2*pc.cover_paper_outgo)/14000)*100\n    ELSE NULL\n  END) as cover_risograph_bw_printer_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // remove
  collection.schema.removeField("evz2gizu")

  // remove
  collection.schema.removeField("hpe7musv")

  // remove
  collection.schema.removeField("qzktt1vk")

  // remove
  collection.schema.removeField("g4qkzmnr")

  // remove
  collection.schema.removeField("wzfjesgf")

  // remove
  collection.schema.removeField("fswmgind")

  // remove
  collection.schema.removeField("tfefj9xp")

  // remove
  collection.schema.removeField("6ejwhdcm")

  // remove
  collection.schema.removeField("mbfn7cjk")

  // remove
  collection.schema.removeField("aweipcbd")

  // remove
  collection.schema.removeField("5udsgv8p")

  // remove
  collection.schema.removeField("cgvu26ii")

  // remove
  collection.schema.removeField("jgxxceuo")

  // remove
  collection.schema.removeField("soz4xmsm")

  // remove
  collection.schema.removeField("r8d3h9w7")

  // remove
  collection.schema.removeField("hgs4iftb")

  // remove
  collection.schema.removeField("btzpfc1p")

  // remove
  collection.schema.removeField("izehkji7")

  // remove
  collection.schema.removeField("ttawxtsu")

  // remove
  collection.schema.removeField("x2r1ltfg")

  // remove
  collection.schema.removeField("zchmc59f")

  // remove
  collection.schema.removeField("gc28roxe")

  // remove
  collection.schema.removeField("yfcpun1t")

  // remove
  collection.schema.removeField("qnyr4dm0")

  // remove
  collection.schema.removeField("wcokhgrs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnbeokre",
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
    "id": "sgj9ptxo",
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
    "id": "mjcb7q0w",
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
    "id": "kptoqwzr",
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
    "id": "gfcivpsi",
    "name": "cover_digital_color_printer_outgo",
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
    "id": "qjcmlft0",
    "name": "block_digital_bw_printer_outgo",
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
    "id": "ug1pcpc2",
    "name": "cover_digital_bw_printer_outgo",
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
    "id": "mol166cg",
    "name": "block_risograph_bw_printer_outgo",
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
    "id": "2edzutmw",
    "name": "cover_risograph_bw_printer_outgo",
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
    "query": "WITH pre_calc as (\n  WITH circulation_calc as (\n    SELECT\n      o.id as id,\n      ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n  )\n  SELECT\n    o.id as id,\n    cc.estimated_circulation as estimated_circulation,\n    o.block_paper = o.cover_paper as paper_equal,\n    (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    cc.estimated_circulation/o.cover_multiplicity as cover_paper_outgo\n  FROM orders o, circulation_calc cc\n  WHERE o.id = cc.id\n)\nSELECT \n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  block_colors.name as block_color,\n  cover_colors.name as cover_color,\n  o.block_departure_elements as block_departure_elements,\n  o.cover_departure_elements as cover_departure_elements,\n  block_papers.name as block_paper,\n  cover_papers.name as cover_paper,\n  block_printers.name as block_printer,\n  cover_printers.name as cover_printer,\n  o.cover_lamination as cover_lamination,\n  o.block_multiplicity as block_multiplicity,\n  o.block_format as block_format,\n  o.cover_multiplicity as cover_multiplicity,\n  o.cover_format as cover_format,\n  o.appended_transparent_elements as appended_transparent_elements,\n  pc.estimated_circulation as estimated_circulation,\n  (CASE\n    WHEN block_printers.is_digital AND block_colors.is_color THEN (o.page_num*pc.estimated_circulation)/(o.block_multiplicity*32000)*100\n    ELSE NULL\n  END) as block_digital_color_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_digital AND cover_colors.is_color THEN (2*pc.estimated_circulation)/(o.cover_multiplicity*32000)*100\n    ELSE NULL\n  END) as cover_digital_color_printer_outgo,\n  (CASE\n    WHEN block_printers.is_digital AND NOT block_colors.is_color THEN (o.page_num*pc.estimated_circulation)/(o.block_multiplicity*30000)*100\n    ELSE NULL\n  END) as block_digital_bw_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_digital AND NOT cover_colors.is_color THEN (2*pc.estimated_circulation)/(o.cover_multiplicity*30000)*100\n    ELSE NULL\n  END) as cover_digital_bw_printer_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evz2gizu",
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
    "id": "hpe7musv",
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
    "id": "qzktt1vk",
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
    "id": "g4qkzmnr",
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
    "id": "wzfjesgf",
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
    "id": "fswmgind",
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
    "id": "tfefj9xp",
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
    "id": "6ejwhdcm",
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
    "id": "mbfn7cjk",
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
    "id": "aweipcbd",
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
    "id": "5udsgv8p",
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
    "id": "cgvu26ii",
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
    "id": "jgxxceuo",
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
    "id": "soz4xmsm",
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
    "id": "r8d3h9w7",
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
    "id": "hgs4iftb",
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
    "id": "btzpfc1p",
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
    "id": "izehkji7",
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
    "id": "ttawxtsu",
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
    "id": "x2r1ltfg",
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
    "id": "zchmc59f",
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
    "id": "gc28roxe",
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
    "id": "yfcpun1t",
    "name": "cover_digital_color_printer_outgo",
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
    "id": "qnyr4dm0",
    "name": "block_digital_bw_printer_outgo",
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
    "id": "wcokhgrs",
    "name": "cover_digital_bw_printer_outgo",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("wnbeokre")

  // remove
  collection.schema.removeField("sgj9ptxo")

  // remove
  collection.schema.removeField("mjcb7q0w")

  // remove
  collection.schema.removeField("kptoqwzr")

  // remove
  collection.schema.removeField("gfcivpsi")

  // remove
  collection.schema.removeField("qjcmlft0")

  // remove
  collection.schema.removeField("ug1pcpc2")

  // remove
  collection.schema.removeField("mol166cg")

  // remove
  collection.schema.removeField("2edzutmw")

  return dao.saveCollection(collection)
})
