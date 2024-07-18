/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH calc as (\n  SELECT \n    o.id as id,\n    op.block_paper_name as paper_outgo_1_name,\n    (CASE\n      WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n      ELSE op.block_paper_outgo\n    END) as paper_outgo_1_value,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_name\n      ELSE NULL\n    END) as paper_outgo_2_name,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n      ELSE NULL\n    END) as paper_outgo_2_value,\n    (CASE\n      WHEN oc.is_block_printer_color_digital AND oc.is_cover_printer_color_digital THEN round((2*(op.block_paper_outgo + op.cover_paper_outgo)/32000)*100,2)\n      WHEN oc.is_block_printer_color_digital THEN round(((2*op.block_paper_outgo)/32000)*100,2)\n      WHEN oc.is_cover_printer_color_digital THEN round(((2*op.cover_paper_outgo)/32000)*100,2)\n      ELSE NULL\n    END) as digital_color_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_digital AND oc.is_cover_printer_bw_digital THEN round((2*(op.block_paper_outgo + op.cover_paper_outgo)/30000)*100,2)\n      WHEN oc.is_block_printer_bw_digital THEN round(((2*op.block_paper_outgo)/30000)*100,2)\n      WHEN oc.is_cover_printer_bw_digital THEN round(((2*op.cover_paper_outgo)/30000)*100,2)\n      ELSE NULL\n    END) as digital_bw_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_risograph AND oc.is_cover_printer_bw_risograph THEN round(2*(op.block_paper_outgo + op.cover_paper_outgo)/14000,2)\n      WHEN oc.is_block_printer_bw_risograph THEN round((2*op.block_paper_outgo)/14000,2)\n      WHEN oc.is_cover_printer_bw_risograph THEN round((2*op.cover_paper_outgo)/14000,2)\n      ELSE NULL\n    END) as risograph_bw_printer_outgo,\n    (CASE\n      WHEN fastenings.is_hot_melt_adhesive THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n      ELSE NULL\n    END) as hot_melt_adhesive_outgo,\n    (CASE\n      WHEN fastenings.is_polyurethane THEN round(op.block_paper_outgo*formats.outgo_multiplier*0.00005,2)\n      ELSE NULL\n    END) as polyurethane_outgo,\n    (CASE\n      WHEN o.cover_lamination != \"\" THEN round(oec.estimated_circulation*formats.outgo_multiplier*0.27,2)\n      ELSE NULL\n    END) as lamination_outgo,\n    (CASE\n      WHEN fastenings.append_transparent_elements THEN 2\n      ELSE NULL\n    END) as transparent_elements_outgo\n  FROM orders o,\n      orders_estimated_circulations oec,\n      orders_papers op,\n      orders_colors oc,\n      formats,\n      fastenings\n  WHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\n  AND   formats.id = o.format\n  AND   fastenings.id = o.fastening\n)\nSELECT\n  o.id as id,\n  calc.paper_outgo_1_name as paper_outgo_1_name,\n  calc.paper_outgo_1_value as paper_outgo_1_value,\n  calc.paper_outgo_2_name as paper_outgo_2_name,\n  calc.paper_outgo_2_value as paper_outgo_2_value,\n  calc.digital_color_printer_outgo as digital_color_printer_outgo,\n  calc.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  calc.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  calc.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  calc.polyurethane_outgo as polyurethane_outgo,\n  calc.lamination_outgo as lamination_outgo,\n  calc.transparent_elements_outgo as transparent_elements_outgo,\n  round(IFNULL(calc.digital_color_printer_outgo,0)*0.2+IFNULL(calc.digital_bw_printer_outgo,0)*0.1+IFNULL(calc.risograph_bw_printer_outgo,0)*0.3,2) as digital_consumables_outgo\nFROM orders o,\n     calc\nWHERE o.id = calc.id"
  }

  // remove
  collection.schema.removeField("uc4md0c0")

  // remove
  collection.schema.removeField("0zgu5k60")

  // remove
  collection.schema.removeField("cdpeq43o")

  // remove
  collection.schema.removeField("l49llu7l")

  // remove
  collection.schema.removeField("6pxqzpnl")

  // remove
  collection.schema.removeField("by85qsty")

  // remove
  collection.schema.removeField("erdp5rmq")

  // remove
  collection.schema.removeField("tccpcna8")

  // remove
  collection.schema.removeField("06ajqj4i")

  // remove
  collection.schema.removeField("ss7ps1nj")

  // remove
  collection.schema.removeField("rdr1z9gt")

  // remove
  collection.schema.removeField("47n8rpv8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ouoqkcf",
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
    "id": "qpyj6iu8",
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
    "id": "om0chu8n",
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
    "id": "c5v4ijl9",
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
    "id": "jivgc2jf",
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
    "id": "rc2saacr",
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
    "id": "npwk1kp4",
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
    "id": "hlzet6vd",
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
    "id": "odmvsscu",
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
    "id": "0pccu9em",
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
    "id": "6fllewqi",
    "name": "transparent_elements_outgo",
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
    "id": "itqprpdq",
    "name": "digital_consumables_outgo",
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
    "query": "WITH calc as (\n  SELECT \n    o.id as id,\n    op.block_paper_name as paper_outgo_1_name,\n    (CASE\n      WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n      ELSE op.block_paper_outgo\n    END) as paper_outgo_1_value,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_name\n      ELSE NULL\n    END) as paper_outgo_2_name,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n      ELSE NULL\n    END) as paper_outgo_2_value,\n    (CASE\n      WHEN oc.is_block_printer_color_digital AND oc.is_cover_printer_color_digital THEN round((2*(op.block_paper_outgo + op.cover_paper_outgo)/32000)*100,2)\n      WHEN oc.is_block_printer_color_digital THEN round(((2*op.block_paper_outgo)/32000)*100,2)\n      WHEN oc.is_cover_printer_color_digital THEN round(((2*op.cover_paper_outgo)/32000)*100,2)\n      ELSE NULL\n    END) as digital_color_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_digital AND oc.is_cover_printer_bw_digital THEN round((2*(op.block_paper_outgo + op.cover_paper_outgo)/30000)*100,2)\n      WHEN oc.is_block_printer_bw_digital THEN round(((2*op.block_paper_outgo)/30000)*100,2)\n      WHEN oc.is_cover_printer_bw_digital THEN round(((2*op.cover_paper_outgo)/30000)*100,2)\n      ELSE NULL\n    END) as digital_bw_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_risograph AND oc.is_cover_printer_bw_risograph THEN round(2*(op.block_paper_outgo + op.cover_paper_outgo)/14000,2)\n      WHEN oc.is_block_printer_bw_risograph THEN round((2*op.block_paper_outgo)/14000,2)\n      WHEN oc.is_cover_printer_bw_risograph THEN round((2*op.cover_paper_outgo)/14000,2)\n      ELSE NULL\n    END) as risograph_bw_printer_outgo,\n    (CASE\n      WHEN fastenings.is_hot_melt_adhesive THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n      ELSE NULL\n    END) as hot_melt_adhesive_outgo,\n    (CASE\n      WHEN fastenings.is_polyurethane THEN round(op.block_paper_outgo*formats.outgo_multiplier*0.00005,2)\n      ELSE NULL\n    END) as polyurethane_outgo,\n    (CASE\n      WHEN o.cover_lamination THEN round(oec.estimated_circulation*formats.outgo_multiplier*0.27,2)\n      ELSE NULL\n    END) as lamination_outgo,\n    (CASE\n      WHEN fastenings.append_transparent_elements THEN 2\n      ELSE NULL\n    END) as transparent_elements_outgo\n  FROM orders o,\n      orders_estimated_circulations oec,\n      orders_papers op,\n      orders_colors oc,\n      formats,\n      fastenings\n  WHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\n  AND   formats.id = o.format\n  AND   fastenings.id = o.fastening\n)\nSELECT\n  o.id as id,\n  calc.paper_outgo_1_name as paper_outgo_1_name,\n  calc.paper_outgo_1_value as paper_outgo_1_value,\n  calc.paper_outgo_2_name as paper_outgo_2_name,\n  calc.paper_outgo_2_value as paper_outgo_2_value,\n  calc.digital_color_printer_outgo as digital_color_printer_outgo,\n  calc.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  calc.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  calc.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  calc.polyurethane_outgo as polyurethane_outgo,\n  calc.lamination_outgo as lamination_outgo,\n  calc.transparent_elements_outgo as transparent_elements_outgo,\n  round(IFNULL(calc.digital_color_printer_outgo,0)*0.2+IFNULL(calc.digital_bw_printer_outgo,0)*0.1+IFNULL(calc.risograph_bw_printer_outgo,0)*0.3,2) as digital_consumables_outgo\nFROM orders o,\n     calc\nWHERE o.id = calc.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uc4md0c0",
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
    "id": "0zgu5k60",
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
    "id": "cdpeq43o",
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
    "id": "l49llu7l",
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
    "id": "6pxqzpnl",
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
    "id": "by85qsty",
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
    "id": "erdp5rmq",
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
    "id": "tccpcna8",
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
    "id": "06ajqj4i",
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
    "id": "ss7ps1nj",
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
    "id": "rdr1z9gt",
    "name": "transparent_elements_outgo",
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
    "id": "47n8rpv8",
    "name": "digital_consumables_outgo",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("9ouoqkcf")

  // remove
  collection.schema.removeField("qpyj6iu8")

  // remove
  collection.schema.removeField("om0chu8n")

  // remove
  collection.schema.removeField("c5v4ijl9")

  // remove
  collection.schema.removeField("jivgc2jf")

  // remove
  collection.schema.removeField("rc2saacr")

  // remove
  collection.schema.removeField("npwk1kp4")

  // remove
  collection.schema.removeField("hlzet6vd")

  // remove
  collection.schema.removeField("odmvsscu")

  // remove
  collection.schema.removeField("0pccu9em")

  // remove
  collection.schema.removeField("6fllewqi")

  // remove
  collection.schema.removeField("itqprpdq")

  return dao.saveCollection(collection)
})
