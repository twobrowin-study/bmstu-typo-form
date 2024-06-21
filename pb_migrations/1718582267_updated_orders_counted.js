/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.name = "orders_main_materials"
  collection.options = {
    "query": "SELECT \n  o.id as id,\n  op.block_paper_outgo as paper_outgo_1_name,\n  (CASE\n    WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n    ELSE op.block_paper_outgo\n  END) as paper_outgo_1_value,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_name\n    ELSE NULL\n  END) as paper_outgo_2_name,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n    ELSE NULL\n  END) as paper_outgo_2_value\nFROM orders o,\n     orders_estimated_circulations oec,\n     orders_papers op,\n     orders_colors oc,\n     formats,\n     fastenings\nWHERE o.id = oec.id = op.id = oc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening"
  }

  // remove
  collection.schema.removeField("ckvh81ar")

  // remove
  collection.schema.removeField("sscacqjg")

  // remove
  collection.schema.removeField("mgylfi50")

  // remove
  collection.schema.removeField("op7rhqqf")

  // remove
  collection.schema.removeField("b5nk1lkk")

  // remove
  collection.schema.removeField("uvw0lta6")

  // remove
  collection.schema.removeField("s1bbymjo")

  // remove
  collection.schema.removeField("yfbwdtz7")

  // remove
  collection.schema.removeField("j9qbziw6")

  // remove
  collection.schema.removeField("4m8utdus")

  // remove
  collection.schema.removeField("ihtyjp6n")

  // remove
  collection.schema.removeField("twxns1sm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lv2rcivj",
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
    "id": "zbvo6ppl",
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
    "id": "mslqt2wm",
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
    "id": "tae81wym",
    "name": "paper_outgo_2_value",
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

  collection.name = "orders_counted"
  collection.options = {
    "query": "WITH pre_calc as (\n  WITH circulation_calc as (\n    SELECT\n      o.id as id,\n      ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n  )\n  SELECT\n    o.id as id,\n    cc.estimated_circulation as estimated_circulation,\n    o.block_paper = o.cover_paper as paper_equal,\n    (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    cc.estimated_circulation/o.cover_multiplicity as cover_paper_outgo,\n    block_printers.is_digital AND block_colors.is_color as is_block_printer_color_digital,\n    cover_printers.is_digital AND cover_colors.is_color as is_cover_printer_color_digital,\n    block_printers.is_digital AND NOT block_colors.is_color as is_block_printer_bw_digital,\n    cover_printers.is_digital AND NOT cover_colors.is_color as is_cover_printer_bw_digital,\n    block_printers.is_risograph AND NOT block_colors.is_color as is_block_printer_bw_risograph,\n    cover_printers.is_risograph AND NOT cover_colors.is_color as is_cover_printer_bw_risograph\n  FROM orders o,\n       circulation_calc cc,\n       colors block_colors,\n       colors cover_colors,\n       printers block_printers,\n       printers cover_printers\n  WHERE o.id = cc.id\n  AND   block_colors.id = o.block_color\n  AND   cover_colors.id = o.cover_color\n  AND   block_printers.id = o.block_printer\n  AND   cover_printers.id = o.cover_printer\n)\nSELECT \n  o.id as id,\n  pc.estimated_circulation as estimated_circulation,\n  concat(block_papers.name, ' ', o.block_format) as paper_outgo_1_name,\n  (CASE\n    WHEN pc.paper_equal THEN pc.block_paper_outgo + pc.cover_paper_outgo\n    ELSE pc.block_paper_outgo\n  END) as paper_outgo_1_value,\n  (CASE\n    WHEN NOT pc.paper_equal THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as paper_outgo_2_name,\n  (CASE\n    WHEN NOT pc.paper_equal THEN pc.cover_paper_outgo\n    ELSE NULL\n  END) as paper_outgo_2_value,\n  (CASE\n    WHEN pc.is_block_printer_color_digital AND pc.is_cover_printer_color_digital THEN (2*(pc.block_paper_outgo + pc.cover_paper_outgo)/32000)*100\n    WHEN pc.is_block_printer_color_digital THEN ((2*pc.block_paper_outgo)/32000)*100\n    WHEN pc.is_cover_printer_color_digital THEN ((2*pc.cover_paper_outgo)/32000)*100\n    ELSE NULL\n  END) as digital_color_printer_outgo,\n  (CASE\n    WHEN pc.is_block_printer_bw_digital AND pc.is_cover_printer_bw_digital THEN (2*(pc.block_paper_outgo + pc.cover_paper_outgo)/30000)*100\n    WHEN pc.is_block_printer_bw_digital THEN ((2*pc.block_paper_outgo)/30000)*100\n    WHEN pc.is_cover_printer_bw_digital THEN ((2*pc.cover_paper_outgo)/30000)*100\n    ELSE NULL\n  END) as digital_bw_printer_outgo,\n  (CASE\n    WHEN pc.is_block_printer_bw_risograph AND pc.is_cover_printer_bw_risograph THEN 2*(pc.block_paper_outgo + pc.cover_paper_outgo)/14000\n    WHEN pc.is_block_printer_bw_risograph THEN (2*pc.block_paper_outgo)/14000\n    WHEN pc.is_cover_printer_bw_risograph THEN (2*pc.cover_paper_outgo)/14000\n    ELSE NULL\n  END) as risograph_bw_printer_outgo,\n  (CASE\n    WHEN fastenings.is_hot_melt_adhesive THEN pc.block_paper_outgo*formats.outgo_multiplier*0.00005\n    ELSE NULL\n  END) as hot_melt_adhesive_outgo,\n  (CASE\n    WHEN fastenings.is_polyurethane THEN pc.block_paper_outgo*formats.outgo_multiplier*0.00005\n    ELSE NULL\n  END) as polyurethane_outgo,\n  (CASE\n    WHEN o.cover_lamination THEN pc.estimated_circulation*formats.outgo_multiplier*0.27\n    ELSE NULL\n  END) as lamination_outgo,\n  (CASE\n    WHEN fastenings.append_transparent_elements THEN 2\n    ELSE NULL\n  END) as transparent_elements_outgo\nFROM orders o,\n     pre_calc pc,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = pc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ckvh81ar",
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
    "id": "sscacqjg",
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
    "id": "mgylfi50",
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
    "id": "op7rhqqf",
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
    "id": "b5nk1lkk",
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
    "id": "uvw0lta6",
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
    "id": "s1bbymjo",
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
    "id": "yfbwdtz7",
    "name": "risograph_bw_printer_outgo",
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
    "id": "j9qbziw6",
    "name": "hot_melt_adhesive_outgo",
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
    "id": "4m8utdus",
    "name": "polyurethane_outgo",
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
    "id": "ihtyjp6n",
    "name": "lamination_outgo",
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
    "id": "twxns1sm",
    "name": "transparent_elements_outgo",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("lv2rcivj")

  // remove
  collection.schema.removeField("zbvo6ppl")

  // remove
  collection.schema.removeField("mslqt2wm")

  // remove
  collection.schema.removeField("tae81wym")

  return dao.saveCollection(collection)
})
