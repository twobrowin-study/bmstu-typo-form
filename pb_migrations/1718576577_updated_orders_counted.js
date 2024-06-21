/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH pre_calc as (\n  WITH circulation_calc as (\n    SELECT\n      o.id as id,\n      ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n  )\n  SELECT\n    o.id as id,\n    cc.estimated_circulation as estimated_circulation,\n    o.block_paper = o.cover_paper as paper_equal,\n    (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    cc.estimated_circulation/o.cover_multiplicity as cover_paper_outgo,\n    block_printers.is_digital AND block_colors.is_color as is_block_printer_color_digital,\n    cover_printers.is_digital AND cover_colors.is_color as is_cover_printer_color_digital,\n    block_printers.is_digital AND NOT block_colors.is_color as is_block_printer_bw_digital,\n    cover_printers.is_digital AND NOT cover_colors.is_color as is_cover_printer_bw_digital,\n    block_printers.is_risograph AND NOT block_colors.is_color as is_block_printer_bw_risograph,\n    cover_printers.is_risograph AND NOT cover_colors.is_color as is_cover_printer_bw_risograph\n  FROM orders o,\n       circulation_calc cc,\n       colors block_colors,\n       colors cover_colors,\n       printers block_printers,\n       printers cover_printers\n  WHERE o.id = cc.id\n  AND   block_colors.id = o.block_color\n  AND   cover_colors.id = o.cover_color\n  AND   block_printers.id = o.block_printer\n  AND   cover_printers.id = o.cover_printer\n)\nSELECT \n  o.id as id,\n  pc.estimated_circulation as estimated_circulation,\n  concat(block_papers.name, ' ', o.block_format) as paper_outgo_1_name,\n  (CASE\n    WHEN pc.paper_equal THEN pc.block_paper_outgo + pc.cover_paper_outgo\n    ELSE pc.block_paper_outgo\n  END) as paper_outgo_1_value,\n  (CASE\n    WHEN NOT pc.paper_equal THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as paper_outgo_2_name,\n  (CASE\n    WHEN NOT pc.paper_equal THEN pc.cover_paper_outgo\n    ELSE NULL\n  END) as paper_outgo_2_value,\n  (CASE\n    WHEN pc.is_block_printer_color_digital AND pc.is_cover_printer_color_digital THEN (2*(pc.block_paper_outgo + pc.cover_paper_outgo)/32000)*100\n    WHEN pc.is_block_printer_color_digital THEN ((2*pc.block_paper_outgo)/32000)*100\n    WHEN pc.is_cover_printer_color_digital THEN ((2*pc.cover_paper_outgo)/32000)*100\n    ELSE NULL\n  END) as digital_color_printer_outgo,\n  (CASE\n    WHEN pc.is_block_printer_bw_digital AND pc.is_cover_printer_bw_digital THEN (2*(pc.block_paper_outgo + pc.cover_paper_outgo)/30000)*100\n    WHEN pc.is_block_printer_bw_digital THEN ((2*pc.block_paper_outgo)/30000)*100\n    WHEN pc.is_cover_printer_bw_digital THEN ((2*pc.cover_paper_outgo)/30000)*100\n    ELSE NULL\n  END) as digital_bw_printer_outgo,\n  (CASE\n    WHEN pc.is_block_printer_bw_risograph AND pc.is_cover_printer_bw_risograph THEN 2*(pc.block_paper_outgo + pc.cover_paper_outgo)/14000\n    WHEN pc.is_block_printer_bw_risograph THEN (2*pc.block_paper_outgo)/14000\n    WHEN pc.is_cover_printer_bw_risograph THEN (2*pc.cover_paper_outgo)/14000\n    ELSE NULL\n  END) as risograph_bw_printer_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kyf9w59f",
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
    "id": "cza1kzhb",
    "name": "paper_outgo_1_name",
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
    "id": "wkpy7bqs",
    "name": "paper_outgo_1_value",
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
    "id": "c3yoszj2",
    "name": "paper_outgo_2_name",
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
    "id": "hseemz6u",
    "name": "paper_outgo_2_value",
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
    "id": "vzxdc0oi",
    "name": "digital_color_printer_outgo",
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
    "id": "4xdzpcen",
    "name": "digital_bw_printer_outgo",
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
    "id": "kj1vdb2y",
    "name": "risograph_bw_printer_outgo",
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
    "query": "WITH pre_calc as (\n  WITH circulation_calc as (\n    SELECT\n      o.id as id,\n      ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n  )\n  SELECT\n    o.id as id,\n    cc.estimated_circulation as estimated_circulation,\n    (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    cc.estimated_circulation/o.cover_multiplicity as cover_paper_outgo\n  FROM orders o, circulation_calc cc\n  WHERE o.id = cc.id\n)\nSELECT \n  o.id as id,\n  pc.estimated_circulation as estimated_circulation,\n  pc.block_paper_outgo as block_paper_outgo,\n  pc.cover_paper_outgo cover_paper_outgo,\n  (CASE\n    WHEN block_printers.is_digital AND block_colors.is_color THEN ((2*pc.block_paper_outgo)/32000)*100\n    ELSE NULL\n  END) as block_digital_color_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_digital AND cover_colors.is_color THEN ((2*pc.cover_paper_outgo)/32000)*100\n    ELSE NULL\n  END) as cover_digital_color_printer_outgo,\n  (CASE\n    WHEN block_printers.is_digital AND NOT block_colors.is_color THEN ((2*pc.block_paper_outgo)/30000)*100\n    ELSE NULL\n  END) as block_digital_bw_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_digital AND NOT cover_colors.is_color THEN ((2*pc.cover_paper_outgo)/30000)*100\n    ELSE NULL\n  END) as cover_digital_bw_printer_outgo,\n  (CASE\n    WHEN block_printers.is_risograph AND NOT block_colors.is_color THEN ((2*pc.block_paper_outgo)/14000)*100\n    ELSE NULL\n  END) as block_risograph_bw_printer_outgo,\n  (CASE\n    WHEN cover_printers.is_risograph AND NOT cover_colors.is_color THEN ((2*pc.cover_paper_outgo)/14000)*100\n    ELSE NULL\n  END) as cover_risograph_bw_printer_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

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

  // remove
  collection.schema.removeField("kyf9w59f")

  // remove
  collection.schema.removeField("cza1kzhb")

  // remove
  collection.schema.removeField("wkpy7bqs")

  // remove
  collection.schema.removeField("c3yoszj2")

  // remove
  collection.schema.removeField("hseemz6u")

  // remove
  collection.schema.removeField("vzxdc0oi")

  // remove
  collection.schema.removeField("4xdzpcen")

  // remove
  collection.schema.removeField("kj1vdb2y")

  return dao.saveCollection(collection)
})
