/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "SELECT id from orders"
  }

  // remove
  collection.schema.removeField("d09hk4s9")

  // remove
  collection.schema.removeField("sxvlcxkp")

  // remove
  collection.schema.removeField("1h7nib9f")

  // remove
  collection.schema.removeField("xdyz78bd")

  // remove
  collection.schema.removeField("zarqvmev")

  // remove
  collection.schema.removeField("yabimsna")

  // remove
  collection.schema.removeField("cllazdan")

  // remove
  collection.schema.removeField("mm0emvho")

  // remove
  collection.schema.removeField("lsxesv8d")

  // remove
  collection.schema.removeField("kyrvrehu")

  // remove
  collection.schema.removeField("cmfiwpjd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "WITH calc as (\n  SELECT \n    o.id as id,\n    op.block_paper_name as paper_outgo_1_name,\n    (CASE\n      WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n      ELSE op.block_paper_outgo\n    END) as paper_outgo_1_value,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_name\n      ELSE NULL\n    END) as paper_outgo_2_name,\n    (CASE\n      WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n      ELSE NULL\n    END) as paper_outgo_2_value,\n    (CASE\n      WHEN oc.is_block_printer_color_digital AND oc.is_cover_printer_color_digital THEN round((2*(op.block_paper_outgo + op.cover_paper_outgo)/32000)*100,2)\n      WHEN oc.is_block_printer_color_digital THEN round(((2*op.block_paper_outgo)/32000)*100,2)\n      WHEN oc.is_cover_printer_color_digital THEN round(((2*op.cover_paper_outgo)/32000)*100,2)\n      ELSE NULL\n    END) as digital_color_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_digital AND oc.is_cover_printer_bw_digital THEN round((2*(op.block_paper_outgo + op.cover_paper_outgo)/30000)*100,2)\n      WHEN oc.is_block_printer_bw_digital THEN round(((2*op.block_paper_outgo)/30000)*100,2)\n      WHEN oc.is_cover_printer_bw_digital THEN round(((2*op.cover_paper_outgo)/30000)*100,2)\n      ELSE NULL\n    END) as digital_bw_printer_outgo,\n    (CASE\n      WHEN oc.is_block_printer_bw_risograph AND oc.is_cover_printer_bw_risograph THEN round(2*(op.block_paper_outgo + op.cover_paper_outgo)/14000,2)\n      WHEN oc.is_block_printer_bw_risograph THEN round((2*op.block_paper_outgo)/14000,2)\n      WHEN oc.is_cover_printer_bw_risograph THEN round((2*op.cover_paper_outgo)/14000,2)\n      ELSE NULL\n    END) as risograph_bw_printer_outgo,\n    (CASE\n      WHEN fastenings.is_hot_melt_adhesive THEN op.block_paper_outgo*formats.outgo_multiplier*0.00005\n      ELSE NULL\n    END) as hot_melt_adhesive_outgo,\n    (CASE\n      WHEN fastenings.is_polyurethane THEN round(op.block_paper_outgo*formats.outgo_multiplier*0.00005,2)\n      ELSE NULL\n    END) as polyurethane_outgo,\n    (CASE\n      WHEN fastenings.append_transparent_elements THEN 2\n      ELSE NULL\n    END) as transparent_elements_outgo\n  FROM orders o,\n      orders_estimated_circulations oec,\n      orders_papers op,\n      orders_colors oc,\n      formats,\n      fastenings\n  WHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\n  AND   formats.id = o.format\n  AND   fastenings.id = o.fastening\n)\nSELECT\n  o.id as id,\n  calc.paper_outgo_1_name as paper_outgo_1_name,\n  calc.paper_outgo_1_value as paper_outgo_1_value,\n  calc.paper_outgo_2_name as paper_outgo_2_name,\n  calc.paper_outgo_2_value as paper_outgo_2_value,\n  calc.digital_color_printer_outgo as digital_color_printer_outgo,\n  calc.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  calc.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  calc.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  calc.polyurethane_outgo as polyurethane_outgo,\n  calc.transparent_elements_outgo as transparent_elements_outgo,\n  round(IFNULL(calc.digital_color_printer_outgo,0)*0.2+IFNULL(calc.digital_bw_printer_outgo,0)*0.1+IFNULL(calc.risograph_bw_printer_outgo,0)*0.3,2) as digital_consumables_outgo\nFROM orders o,\n     calc\nWHERE o.id = calc.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d09hk4s9",
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
    "id": "sxvlcxkp",
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
    "id": "1h7nib9f",
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
    "id": "xdyz78bd",
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
    "id": "zarqvmev",
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
    "id": "yabimsna",
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
    "id": "cllazdan",
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
    "id": "mm0emvho",
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
    "id": "lsxesv8d",
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
    "id": "kyrvrehu",
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
    "id": "cmfiwpjd",
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
})
