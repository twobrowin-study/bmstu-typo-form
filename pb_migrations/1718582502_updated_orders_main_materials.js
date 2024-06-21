/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "SELECT \n  o.id as id,\n  op.block_paper_name as paper_outgo_1_name,\n  (CASE\n    WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n    ELSE op.block_paper_outgo\n  END) as paper_outgo_1_value,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_name\n    ELSE NULL\n  END) as paper_outgo_2_name,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n    ELSE NULL\n  END) as paper_outgo_2_value,\n  (CASE\n    WHEN oc.is_block_printer_color_digital AND oc.is_cover_printer_color_digital THEN (2*(op.block_paper_outgo + op.cover_paper_outgo)/32000)*100\n    WHEN oc.is_block_printer_color_digital THEN ((2*op.block_paper_outgo)/32000)*100\n    WHEN oc.is_cover_printer_color_digital THEN ((2*op.cover_paper_outgo)/32000)*100\n    ELSE NULL\n  END) as digital_color_printer_outgo,\n  (CASE\n    WHEN oc.is_block_printer_bw_digital AND oc.is_cover_printer_bw_digital THEN (2*(op.block_paper_outgo + op.cover_paper_outgo)/30000)*100\n    WHEN oc.is_block_printer_bw_digital THEN ((2*op.block_paper_outgo)/30000)*100\n    WHEN oc.is_cover_printer_bw_digital THEN ((2*op.cover_paper_outgo)/30000)*100\n    ELSE NULL\n  END) as digital_bw_printer_outgo,\n  (CASE\n    WHEN oc.is_block_printer_bw_risograph AND oc.is_cover_printer_bw_risograph THEN 2*(op.block_paper_outgo + op.cover_paper_outgo)/14000\n    WHEN oc.is_block_printer_bw_risograph THEN (2*op.block_paper_outgo)/14000\n    WHEN oc.is_cover_printer_bw_risograph THEN (2*op.cover_paper_outgo)/14000\n    ELSE NULL\n  END) as risograph_bw_printer_outgo,\n  (CASE\n    WHEN fastenings.is_hot_melt_adhesive THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n    ELSE NULL\n  END) as hot_melt_adhesive_outgo,\n  (CASE\n    WHEN fastenings.is_polyurethane THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n    ELSE NULL\n  END) as polyurethane_outgo,\n  (CASE\n    WHEN o.cover_lamination THEN oec.estimated_circulation*formats.outgo_multiplier*0.27\n    ELSE NULL\n  END) as lamination_outgo,\n  (CASE\n    WHEN fastenings.append_transparent_elements THEN 2\n    ELSE NULL\n  END) as transparent_elements_outgo\nFROM orders o,\n     orders_estimated_circulations oec,\n     orders_papers op,\n     orders_colors oc,\n     formats,\n     fastenings\nWHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening"
  }

  // remove
  collection.schema.removeField("76pgjhfb")

  // remove
  collection.schema.removeField("tjs7gvru")

  // remove
  collection.schema.removeField("cg0sowfo")

  // remove
  collection.schema.removeField("ztvfprtq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lhdmyvo7",
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
    "id": "zoalfsjq",
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
    "id": "zfeeikho",
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
    "id": "ccdncrdi",
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
    "id": "sk4tzmbt",
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
    "id": "e44jrunr",
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
    "id": "zbamrrfq",
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
    "id": "dipqe1sl",
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
    "id": "3r1szb2w",
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
    "id": "rzwfttqf",
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
    "id": "bgdxlv6r",
    "name": "transparent_elements_outgo",
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
    "query": "SELECT \n  o.id as id,\n  op.block_paper_name as paper_outgo_1_name,\n  (CASE\n    WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n    ELSE op.block_paper_outgo\n  END) as paper_outgo_1_value,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_name\n    ELSE NULL\n  END) as paper_outgo_2_name,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n    ELSE NULL\n  END) as paper_outgo_2_value\nFROM orders o,\n     orders_estimated_circulations oec,\n     orders_papers op,\n     orders_colors oc,\n     formats,\n     fastenings\nWHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "76pgjhfb",
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
    "id": "tjs7gvru",
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
    "id": "cg0sowfo",
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
    "id": "ztvfprtq",
    "name": "paper_outgo_2_value",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("lhdmyvo7")

  // remove
  collection.schema.removeField("zoalfsjq")

  // remove
  collection.schema.removeField("zfeeikho")

  // remove
  collection.schema.removeField("ccdncrdi")

  // remove
  collection.schema.removeField("sk4tzmbt")

  // remove
  collection.schema.removeField("e44jrunr")

  // remove
  collection.schema.removeField("zbamrrfq")

  // remove
  collection.schema.removeField("dipqe1sl")

  // remove
  collection.schema.removeField("3r1szb2w")

  // remove
  collection.schema.removeField("rzwfttqf")

  // remove
  collection.schema.removeField("bgdxlv6r")

  return dao.saveCollection(collection)
})
