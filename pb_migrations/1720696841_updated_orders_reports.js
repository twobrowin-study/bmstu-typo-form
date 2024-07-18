/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pt7nh5cghvenwdq")

  collection.options = {
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo,\n  ow.file_works as file_works,\n  ow.block_risograph_works as block_risograph_works,\n  ow.block_digital_works as block_digital_works,\n  ow.cutting_work as cutting_work,\n  ow.transport_work as transport_work,\n  ow.package_work as package_work\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // remove
  collection.schema.removeField("s6y6y2nk")

  // remove
  collection.schema.removeField("terpvgmn")

  // remove
  collection.schema.removeField("nsnw84d1")

  // remove
  collection.schema.removeField("nwackngt")

  // remove
  collection.schema.removeField("nr8abino")

  // remove
  collection.schema.removeField("ztxadbfz")

  // remove
  collection.schema.removeField("u39vjoe4")

  // remove
  collection.schema.removeField("sz2oxcyz")

  // remove
  collection.schema.removeField("hqgetz31")

  // remove
  collection.schema.removeField("cbtd8omt")

  // remove
  collection.schema.removeField("tm2h3kit")

  // remove
  collection.schema.removeField("tpk1madm")

  // remove
  collection.schema.removeField("0prluzcu")

  // remove
  collection.schema.removeField("u6prozdh")

  // remove
  collection.schema.removeField("nbwbysft")

  // remove
  collection.schema.removeField("t7yqlpup")

  // remove
  collection.schema.removeField("3dlfhl8n")

  // remove
  collection.schema.removeField("xtcfowil")

  // remove
  collection.schema.removeField("ijb3tgkq")

  // remove
  collection.schema.removeField("djg4hrcc")

  // remove
  collection.schema.removeField("nqjacky5")

  // remove
  collection.schema.removeField("zio1elkg")

  // remove
  collection.schema.removeField("yrioivwy")

  // remove
  collection.schema.removeField("q6gh4vww")

  // remove
  collection.schema.removeField("lbq5odqr")

  // remove
  collection.schema.removeField("gjflk0jf")

  // remove
  collection.schema.removeField("b2gfw9hk")

  // remove
  collection.schema.removeField("qarpdvwk")

  // remove
  collection.schema.removeField("neiswe99")

  // remove
  collection.schema.removeField("7dxc6cqm")

  // remove
  collection.schema.removeField("r9z03eu0")

  // remove
  collection.schema.removeField("hhbtc21v")

  // remove
  collection.schema.removeField("2r8vq30z")

  // remove
  collection.schema.removeField("svclngso")

  // remove
  collection.schema.removeField("xu9mqy4d")

  // remove
  collection.schema.removeField("odqnukfn")

  // remove
  collection.schema.removeField("ag0qpzuq")

  // remove
  collection.schema.removeField("9snfaqku")

  // remove
  collection.schema.removeField("jaly5he4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gylabi4h",
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
    "id": "qmjrvcwd",
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
    "id": "lqd9ux2a",
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
    "id": "sgctucvi",
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
    "id": "8fsgdmci",
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
    "id": "u4j5ea6x",
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
    "id": "0slmfna4",
    "name": "block_color",
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
    "id": "or7gbkyl",
    "name": "cover_color",
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
    "id": "cdnwvi5w",
    "name": "block_departure_elements",
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
    "id": "am8xfqvg",
    "name": "cover_departure_elements",
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
    "id": "fuggztvt",
    "name": "block_paper",
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
    "id": "qa5eka2r",
    "name": "cover_paper",
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
    "id": "mm8ifkgm",
    "name": "block_printer",
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
    "id": "26lrothh",
    "name": "cover_printer",
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
    "id": "3finwosq",
    "name": "block_multiplicity",
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
    "id": "5fkslqwm",
    "name": "block_format",
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
    "id": "3axbndmy",
    "name": "cover_multiplicity",
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
    "id": "vvy5ssf4",
    "name": "cover_format",
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
    "id": "o15qf2e1",
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
    "id": "qbdeh0ed",
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
    "id": "uhygqfwp",
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
    "id": "4kiq2pje",
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
    "id": "srvu8cat",
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
    "id": "ib5z5b0r",
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
    "id": "klyitn8q",
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
    "id": "qg2zyvnd",
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
    "id": "59pjtzi4",
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
    "id": "ne6kuxqq",
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
    "id": "cqdvmehs",
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
    "id": "eajta3jb",
    "name": "digital_consumables_outgo",
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
    "id": "rqqge7xf",
    "name": "file_works",
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
    "id": "mzkdserz",
    "name": "block_risograph_works",
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
    "id": "de766mof",
    "name": "block_digital_works",
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
    "id": "woxoldc5",
    "name": "cutting_work",
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
    "id": "cwdqu6pj",
    "name": "transport_work",
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
    "id": "sue49fns",
    "name": "package_work",
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
  const collection = dao.findCollectionByNameOrId("pt7nh5cghvenwdq")

  collection.options = {
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.cover_lamination as cover_lamination,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.lamination_outgo as lamination_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo,\n  ow.file_works as file_works,\n  ow.block_risograph_works as block_risograph_works,\n  ow.block_digital_works as block_digital_works,\n  ow.cover_laminaion_works as cover_laminaion_works,\n  ow.cutting_work as cutting_work,\n  ow.transport_work as transport_work,\n  ow.package_work as package_work\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s6y6y2nk",
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
    "id": "terpvgmn",
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
    "id": "nsnw84d1",
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
    "id": "nwackngt",
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
    "id": "nr8abino",
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
    "id": "ztxadbfz",
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
    "id": "u39vjoe4",
    "name": "block_color",
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
    "id": "sz2oxcyz",
    "name": "cover_color",
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
    "id": "hqgetz31",
    "name": "block_departure_elements",
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
    "id": "cbtd8omt",
    "name": "cover_departure_elements",
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
    "id": "tm2h3kit",
    "name": "block_paper",
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
    "id": "tpk1madm",
    "name": "cover_paper",
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
    "id": "0prluzcu",
    "name": "block_printer",
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
    "id": "u6prozdh",
    "name": "cover_printer",
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
    "id": "nbwbysft",
    "name": "cover_lamination",
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
    "id": "t7yqlpup",
    "name": "block_multiplicity",
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
    "id": "3dlfhl8n",
    "name": "block_format",
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
    "id": "xtcfowil",
    "name": "cover_multiplicity",
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
    "id": "ijb3tgkq",
    "name": "cover_format",
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
    "id": "djg4hrcc",
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
    "id": "nqjacky5",
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
    "id": "zio1elkg",
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
    "id": "yrioivwy",
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
    "id": "q6gh4vww",
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
    "id": "lbq5odqr",
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
    "id": "gjflk0jf",
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
    "id": "b2gfw9hk",
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
    "id": "qarpdvwk",
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
    "id": "neiswe99",
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
    "id": "7dxc6cqm",
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
    "id": "r9z03eu0",
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
    "id": "hhbtc21v",
    "name": "digital_consumables_outgo",
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
    "id": "2r8vq30z",
    "name": "file_works",
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
    "id": "svclngso",
    "name": "block_risograph_works",
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
    "id": "xu9mqy4d",
    "name": "block_digital_works",
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
    "id": "odqnukfn",
    "name": "cover_laminaion_works",
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
    "id": "ag0qpzuq",
    "name": "cutting_work",
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
    "id": "9snfaqku",
    "name": "transport_work",
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
    "id": "jaly5he4",
    "name": "package_work",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("gylabi4h")

  // remove
  collection.schema.removeField("qmjrvcwd")

  // remove
  collection.schema.removeField("lqd9ux2a")

  // remove
  collection.schema.removeField("sgctucvi")

  // remove
  collection.schema.removeField("8fsgdmci")

  // remove
  collection.schema.removeField("u4j5ea6x")

  // remove
  collection.schema.removeField("0slmfna4")

  // remove
  collection.schema.removeField("or7gbkyl")

  // remove
  collection.schema.removeField("cdnwvi5w")

  // remove
  collection.schema.removeField("am8xfqvg")

  // remove
  collection.schema.removeField("fuggztvt")

  // remove
  collection.schema.removeField("qa5eka2r")

  // remove
  collection.schema.removeField("mm8ifkgm")

  // remove
  collection.schema.removeField("26lrothh")

  // remove
  collection.schema.removeField("3finwosq")

  // remove
  collection.schema.removeField("5fkslqwm")

  // remove
  collection.schema.removeField("3axbndmy")

  // remove
  collection.schema.removeField("vvy5ssf4")

  // remove
  collection.schema.removeField("o15qf2e1")

  // remove
  collection.schema.removeField("qbdeh0ed")

  // remove
  collection.schema.removeField("uhygqfwp")

  // remove
  collection.schema.removeField("4kiq2pje")

  // remove
  collection.schema.removeField("srvu8cat")

  // remove
  collection.schema.removeField("ib5z5b0r")

  // remove
  collection.schema.removeField("klyitn8q")

  // remove
  collection.schema.removeField("qg2zyvnd")

  // remove
  collection.schema.removeField("59pjtzi4")

  // remove
  collection.schema.removeField("ne6kuxqq")

  // remove
  collection.schema.removeField("cqdvmehs")

  // remove
  collection.schema.removeField("eajta3jb")

  // remove
  collection.schema.removeField("rqqge7xf")

  // remove
  collection.schema.removeField("mzkdserz")

  // remove
  collection.schema.removeField("de766mof")

  // remove
  collection.schema.removeField("woxoldc5")

  // remove
  collection.schema.removeField("cwdqu6pj")

  // remove
  collection.schema.removeField("sue49fns")

  return dao.saveCollection(collection)
})
