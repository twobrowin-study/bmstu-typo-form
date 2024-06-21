/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH calc as (\n  SELECT \n    o.id as id,\n    op.block_paper_name as paper_outgo_1_name,\n    (CASE\n      WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n      ELSE op.block_paper_outgo\n    END) as paper_outgo_1_value,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_name\n      ELSE NULL\n    END) as paper_outgo_2_name,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n      ELSE NULL\n    END) as paper_outgo_2_value,\n    (CASE\n      WHEN oc.is_block_printer_color_digital AND oc.is_cover_printer_color_digital THEN (2*(op.block_paper_outgo + op.cover_paper_outgo)/32000)*100\n      WHEN oc.is_block_printer_color_digital THEN ((2*op.block_paper_outgo)/32000)*100\n      WHEN oc.is_cover_printer_color_digital THEN ((2*op.cover_paper_outgo)/32000)*100\n      ELSE NULL\n    END) as digital_color_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_digital AND oc.is_cover_printer_bw_digital THEN (2*(op.block_paper_outgo + op.cover_paper_outgo)/30000)*100\n      WHEN oc.is_block_printer_bw_digital THEN ((2*op.block_paper_outgo)/30000)*100\n      WHEN oc.is_cover_printer_bw_digital THEN ((2*op.cover_paper_outgo)/30000)*100\n      ELSE NULL\n    END) as digital_bw_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_risograph AND oc.is_cover_printer_bw_risograph THEN 2*(op.block_paper_outgo + op.cover_paper_outgo)/14000\n      WHEN oc.is_block_printer_bw_risograph THEN (2*op.block_paper_outgo)/14000\n      WHEN oc.is_cover_printer_bw_risograph THEN (2*op.cover_paper_outgo)/14000\n      ELSE NULL\n    END) as risograph_bw_printer_outgo,\n    (CASE\n      WHEN fastenings.is_hot_melt_adhesive THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n      ELSE NULL\n    END) as hot_melt_adhesive_outgo,\n    (CASE\n      WHEN fastenings.is_polyurethane THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n      ELSE NULL\n    END) as polyurethane_outgo,\n    (CASE\n      WHEN o.cover_lamination THEN oec.estimated_circulation*formats.outgo_multiplier*0.27\n      ELSE NULL\n    END) as lamination_outgo,\n    (CASE\n      WHEN fastenings.append_transparent_elements THEN 2\n      ELSE NULL\n    END) as transparent_elements_outgo\n  FROM orders o,\n      orders_estimated_circulations oec,\n      orders_papers op,\n      orders_colors oc,\n      formats,\n      fastenings\n  WHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\n  AND   formats.id = o.format\n  AND   fastenings.id = o.fastening\n)\nSELECT\n  o.id as id,\n  calc.paper_outgo_1_name as paper_outgo_1_name,\n  calc.paper_outgo_1_value as paper_outgo_1_value,\n  calc.paper_outgo_2_name as paper_outgo_2_name,\n  calc.paper_outgo_2_value as paper_outgo_2_value,\n  calc.digital_color_printer_outgo as digital_color_printer_outgo,\n  calc.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  calc.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  calc.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  calc.polyurethane_outgo as polyurethane_outgo,\n  calc.lamination_outgo as lamination_outgo,\n  calc.transparent_elements_outgo as transparent_elements_outgo,\n  IFNULL(calc.digital_color_printer_outgo,0)*0.2+IFNULL(calc.digital_bw_printer_outgo,0)*0.1+IFNULL(calc.risograph_bw_printer_outgo,0)*0.3 as digital_consumables_outgo\nFROM orders o,\n     calc\nWHERE o.id = calc.id"
  }

  // remove
  collection.schema.removeField("4bphd7c3")

  // remove
  collection.schema.removeField("virfwutt")

  // remove
  collection.schema.removeField("yvmpzkxa")

  // remove
  collection.schema.removeField("vupo1otg")

  // remove
  collection.schema.removeField("rffbmpc8")

  // remove
  collection.schema.removeField("bcmsfodn")

  // remove
  collection.schema.removeField("xbbvyjvx")

  // remove
  collection.schema.removeField("eapj1lyj")

  // remove
  collection.schema.removeField("uzqkftqf")

  // remove
  collection.schema.removeField("r2zyyng8")

  // remove
  collection.schema.removeField("alf15lvq")

  // remove
  collection.schema.removeField("pqikwbh0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ih1205ar",
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
    "id": "ihu4un91",
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
    "id": "1c38884j",
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
    "id": "8xlxwr07",
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
    "id": "xptrg0et",
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
    "id": "lzqusmij",
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
    "id": "c060mjjo",
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
    "id": "km1o7mrg",
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
    "id": "scjpwphm",
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
    "id": "vtbtgu2q",
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
    "id": "mbkqtfyr",
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
    "id": "pbkoghe3",
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
    "query": "WITH calc as (\n  SELECT \n    o.id as id,\n    op.block_paper_name as paper_outgo_1_name,\n    (CASE\n      WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n      ELSE op.block_paper_outgo\n    END) as paper_outgo_1_value,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_name\n      ELSE NULL\n    END) as paper_outgo_2_name,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n      ELSE NULL\n    END) as paper_outgo_2_value,\n    (CASE\n      WHEN oc.is_block_printer_color_digital AND oc.is_cover_printer_color_digital THEN (2*(op.block_paper_outgo + op.cover_paper_outgo)/32000)*100\n      WHEN oc.is_block_printer_color_digital THEN ((2*op.block_paper_outgo)/32000)*100\n      WHEN oc.is_cover_printer_color_digital THEN ((2*op.cover_paper_outgo)/32000)*100\n      ELSE NULL\n    END) as digital_color_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_digital AND oc.is_cover_printer_bw_digital THEN (2*(op.block_paper_outgo + op.cover_paper_outgo)/30000)*100\n      WHEN oc.is_block_printer_bw_digital THEN ((2*op.block_paper_outgo)/30000)*100\n      WHEN oc.is_cover_printer_bw_digital THEN ((2*op.cover_paper_outgo)/30000)*100\n      ELSE NULL\n    END) as digital_bw_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_risograph AND oc.is_cover_printer_bw_risograph THEN 2*(op.block_paper_outgo + op.cover_paper_outgo)/14000\n      WHEN oc.is_block_printer_bw_risograph THEN (2*op.block_paper_outgo)/14000\n      WHEN oc.is_cover_printer_bw_risograph THEN (2*op.cover_paper_outgo)/14000\n      ELSE NULL\n    END) as risograph_bw_printer_outgo,\n    (CASE\n      WHEN fastenings.is_hot_melt_adhesive THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n      ELSE NULL\n    END) as hot_melt_adhesive_outgo,\n    (CASE\n      WHEN fastenings.is_polyurethane THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n      ELSE NULL\n    END) as polyurethane_outgo,\n    (CASE\n      WHEN o.cover_lamination THEN oec.estimated_circulation*formats.outgo_multiplier*0.27\n      ELSE NULL\n    END) as lamination_outgo,\n    (CASE\n      WHEN fastenings.append_transparent_elements THEN 2\n      ELSE NULL\n    END) as transparent_elements_outgo\n  FROM orders o,\n      orders_estimated_circulations oec,\n      orders_papers op,\n      orders_colors oc,\n      formats,\n      fastenings\n  WHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\n  AND   formats.id = o.format\n  AND   fastenings.id = o.fastening\n)\nSELECT\n  o.id as id,\n  calc.paper_outgo_1_name as paper_outgo_1_name,\n  calc.paper_outgo_1_value as paper_outgo_1_value,\n  calc.paper_outgo_2_name as paper_outgo_2_name,\n  calc.paper_outgo_2_value as paper_outgo_2_value,\n  calc.digital_color_printer_outgo as digital_color_printer_outgo,\n  calc.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  calc.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  calc.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  calc.polyurethane_outgo as polyurethane_outgo,\n  calc.lamination_outgo as lamination_outgo,\n  calc.transparent_elements_outgo as transparent_elements_outgo,\n  calc.digital_color_printer_outgo*0.2+calc.digital_bw_printer_outgo*0.1+calc.risograph_bw_printer_outgo*0.3 as digital_consumables_outgo\nFROM orders o,\n     calc\nWHERE o.id = calc.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4bphd7c3",
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
    "id": "virfwutt",
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
    "id": "yvmpzkxa",
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
    "id": "vupo1otg",
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
    "id": "rffbmpc8",
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
    "id": "bcmsfodn",
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
    "id": "xbbvyjvx",
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
    "id": "eapj1lyj",
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
    "id": "uzqkftqf",
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
    "id": "r2zyyng8",
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
    "id": "alf15lvq",
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
    "id": "pqikwbh0",
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
  collection.schema.removeField("ih1205ar")

  // remove
  collection.schema.removeField("ihu4un91")

  // remove
  collection.schema.removeField("1c38884j")

  // remove
  collection.schema.removeField("8xlxwr07")

  // remove
  collection.schema.removeField("xptrg0et")

  // remove
  collection.schema.removeField("lzqusmij")

  // remove
  collection.schema.removeField("c060mjjo")

  // remove
  collection.schema.removeField("km1o7mrg")

  // remove
  collection.schema.removeField("scjpwphm")

  // remove
  collection.schema.removeField("vtbtgu2q")

  // remove
  collection.schema.removeField("mbkqtfyr")

  // remove
  collection.schema.removeField("pbkoghe3")

  return dao.saveCollection(collection)
})
