/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pt7nh5cghvenwdq")

  collection.options = {
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.cover_lamination as cover_lamination,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.lamination_outgo as lamination_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo,\n  ow.file_works as file_works,\n  ow.block_risograph_works as block_risograph_works,\n  ow.block_digital_works as block_digital_works,\n  ow.cover_laminaion_works as cover_laminaion_works,\n  ow.cutting_work as cutting_work,\n  ow.transport_work as transport_work,\n  ow.package_work as package_work\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // remove
  collection.schema.removeField("zwxuq9ex")

  // remove
  collection.schema.removeField("atla5rrz")

  // remove
  collection.schema.removeField("vdb0qgka")

  // remove
  collection.schema.removeField("a58oxeqd")

  // remove
  collection.schema.removeField("eysnipcz")

  // remove
  collection.schema.removeField("d5k6jmj5")

  // remove
  collection.schema.removeField("ksnfkynj")

  // remove
  collection.schema.removeField("8sxssum3")

  // remove
  collection.schema.removeField("kve0k1x9")

  // remove
  collection.schema.removeField("vnfiezcx")

  // remove
  collection.schema.removeField("jkfwpbbk")

  // remove
  collection.schema.removeField("jf2nn6vo")

  // remove
  collection.schema.removeField("3vygyjeq")

  // remove
  collection.schema.removeField("hzzqxgui")

  // remove
  collection.schema.removeField("esanom4j")

  // remove
  collection.schema.removeField("dcdgxqss")

  // remove
  collection.schema.removeField("qbqycyyo")

  // remove
  collection.schema.removeField("paj90d2p")

  // remove
  collection.schema.removeField("c8u9gsgu")

  // remove
  collection.schema.removeField("ssfmha8s")

  // remove
  collection.schema.removeField("xz1aw8lb")

  // remove
  collection.schema.removeField("ifh7p3jn")

  // remove
  collection.schema.removeField("ituery2u")

  // remove
  collection.schema.removeField("reworfby")

  // remove
  collection.schema.removeField("nyxvj5sp")

  // remove
  collection.schema.removeField("hccntynu")

  // remove
  collection.schema.removeField("rwcm3zzq")

  // remove
  collection.schema.removeField("dkfsyklg")

  // remove
  collection.schema.removeField("942oenbk")

  // remove
  collection.schema.removeField("fzo8eliy")

  // remove
  collection.schema.removeField("iwpzh4ku")

  // remove
  collection.schema.removeField("w7ikk3j0")

  // remove
  collection.schema.removeField("qflnylnr")

  // remove
  collection.schema.removeField("rcluygro")

  // remove
  collection.schema.removeField("d7zwlbzx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kxyj9tu4",
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
    "id": "t6yljc1a",
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
    "id": "e7xck1ro",
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
    "id": "aq0nxk2n",
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
    "id": "iier3h5o",
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
    "id": "hx9ldgup",
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
    "id": "mgpi0gmf",
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
    "id": "h8imdi5l",
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
    "id": "wlz6seky",
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
    "id": "lnhp6jmu",
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
    "id": "8morjais",
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
    "id": "ikpsqgjk",
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
    "id": "wxrnpgom",
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
    "id": "ws3o1pzh",
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
    "id": "flbud3t1",
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
    "id": "x125yn2j",
    "name": "block_multiplicity",
    "type": "number",
    "required": true,
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
    "id": "dumdf6f8",
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
    "id": "364lmibd",
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
    "id": "ovultbr4",
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
    "id": "yx3qazj0",
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
    "id": "58gyml7d",
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
    "id": "ajcoinc4",
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
    "id": "0qyzeoem",
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
    "id": "7ltodeku",
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
    "id": "nzou50uf",
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
    "id": "jqyescnn",
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
    "id": "xtwzbx1l",
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
    "id": "giu1nwnm",
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
    "id": "mmulapgv",
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
    "id": "zrzstlp7",
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
    "id": "ywp9svgs",
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
    "id": "unajxerx",
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
    "id": "nue18glw",
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
    "id": "3xs1jbuo",
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
    "id": "7mckw3ps",
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
    "id": "3cbmxfnq",
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
    "id": "tphvkdne",
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
    "id": "nlpkrw0s",
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
    "id": "7lg8doji",
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
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.cover_lamination as cover_lamination,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.lamination_outgo as lamination_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo,\n  ow.file_works as file_works,\n  ow.block_risograph_works as block_risograph_works,\n  ow.block_digital_works as block_digital_works\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zwxuq9ex",
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
    "id": "atla5rrz",
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
    "id": "vdb0qgka",
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
    "id": "a58oxeqd",
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
    "id": "eysnipcz",
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
    "id": "d5k6jmj5",
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
    "id": "ksnfkynj",
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
    "id": "8sxssum3",
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
    "id": "kve0k1x9",
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
    "id": "vnfiezcx",
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
    "id": "jkfwpbbk",
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
    "id": "jf2nn6vo",
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
    "id": "3vygyjeq",
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
    "id": "hzzqxgui",
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
    "id": "esanom4j",
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
    "id": "dcdgxqss",
    "name": "block_multiplicity",
    "type": "number",
    "required": true,
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
    "id": "qbqycyyo",
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
    "id": "paj90d2p",
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
    "id": "c8u9gsgu",
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
    "id": "ssfmha8s",
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
    "id": "xz1aw8lb",
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
    "id": "ifh7p3jn",
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
    "id": "ituery2u",
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
    "id": "reworfby",
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
    "id": "nyxvj5sp",
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
    "id": "hccntynu",
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
    "id": "rwcm3zzq",
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
    "id": "dkfsyklg",
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
    "id": "942oenbk",
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
    "id": "fzo8eliy",
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
    "id": "iwpzh4ku",
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
    "id": "w7ikk3j0",
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
    "id": "qflnylnr",
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
    "id": "rcluygro",
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
    "id": "d7zwlbzx",
    "name": "block_digital_works",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("kxyj9tu4")

  // remove
  collection.schema.removeField("t6yljc1a")

  // remove
  collection.schema.removeField("e7xck1ro")

  // remove
  collection.schema.removeField("aq0nxk2n")

  // remove
  collection.schema.removeField("iier3h5o")

  // remove
  collection.schema.removeField("hx9ldgup")

  // remove
  collection.schema.removeField("mgpi0gmf")

  // remove
  collection.schema.removeField("h8imdi5l")

  // remove
  collection.schema.removeField("wlz6seky")

  // remove
  collection.schema.removeField("lnhp6jmu")

  // remove
  collection.schema.removeField("8morjais")

  // remove
  collection.schema.removeField("ikpsqgjk")

  // remove
  collection.schema.removeField("wxrnpgom")

  // remove
  collection.schema.removeField("ws3o1pzh")

  // remove
  collection.schema.removeField("flbud3t1")

  // remove
  collection.schema.removeField("x125yn2j")

  // remove
  collection.schema.removeField("dumdf6f8")

  // remove
  collection.schema.removeField("364lmibd")

  // remove
  collection.schema.removeField("ovultbr4")

  // remove
  collection.schema.removeField("yx3qazj0")

  // remove
  collection.schema.removeField("58gyml7d")

  // remove
  collection.schema.removeField("ajcoinc4")

  // remove
  collection.schema.removeField("0qyzeoem")

  // remove
  collection.schema.removeField("7ltodeku")

  // remove
  collection.schema.removeField("nzou50uf")

  // remove
  collection.schema.removeField("jqyescnn")

  // remove
  collection.schema.removeField("xtwzbx1l")

  // remove
  collection.schema.removeField("giu1nwnm")

  // remove
  collection.schema.removeField("mmulapgv")

  // remove
  collection.schema.removeField("zrzstlp7")

  // remove
  collection.schema.removeField("ywp9svgs")

  // remove
  collection.schema.removeField("unajxerx")

  // remove
  collection.schema.removeField("nue18glw")

  // remove
  collection.schema.removeField("3xs1jbuo")

  // remove
  collection.schema.removeField("7mckw3ps")

  // remove
  collection.schema.removeField("3cbmxfnq")

  // remove
  collection.schema.removeField("tphvkdne")

  // remove
  collection.schema.removeField("nlpkrw0s")

  // remove
  collection.schema.removeField("7lg8doji")

  return dao.saveCollection(collection)
})
