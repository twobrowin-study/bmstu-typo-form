/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pt7nh5cghvenwdq")

  collection.options = {
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.cover_lamination as cover_lamination,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.lamination_outgo as lamination_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo,\n  ow.file_works as file_works,\n  ow.block_risograph_works as block_risograph_works,\n  ow.block_digital_works as block_digital_works\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // remove
  collection.schema.removeField("j6hfw9q8")

  // remove
  collection.schema.removeField("4vzaqbt3")

  // remove
  collection.schema.removeField("vr4j0who")

  // remove
  collection.schema.removeField("jiyorrki")

  // remove
  collection.schema.removeField("nppfyhtt")

  // remove
  collection.schema.removeField("l7fxywfj")

  // remove
  collection.schema.removeField("omeo4bht")

  // remove
  collection.schema.removeField("oc2e15dk")

  // remove
  collection.schema.removeField("zfaejbjr")

  // remove
  collection.schema.removeField("jasvc3wx")

  // remove
  collection.schema.removeField("2jzaj4lg")

  // remove
  collection.schema.removeField("20ujjktr")

  // remove
  collection.schema.removeField("etdnuz5c")

  // remove
  collection.schema.removeField("4utygiu3")

  // remove
  collection.schema.removeField("c03tahfa")

  // remove
  collection.schema.removeField("ppcilpad")

  // remove
  collection.schema.removeField("hwxhmza8")

  // remove
  collection.schema.removeField("ch6til9g")

  // remove
  collection.schema.removeField("b8kea9yf")

  // remove
  collection.schema.removeField("hwyuv8js")

  // remove
  collection.schema.removeField("gq9gjr3a")

  // remove
  collection.schema.removeField("tdnmkw9t")

  // remove
  collection.schema.removeField("doxei2st")

  // remove
  collection.schema.removeField("1puyrcaf")

  // remove
  collection.schema.removeField("8au3jtsv")

  // remove
  collection.schema.removeField("g0rnd0wb")

  // remove
  collection.schema.removeField("zm642atv")

  // remove
  collection.schema.removeField("kskhth9f")

  // remove
  collection.schema.removeField("3zdr1qmu")

  // remove
  collection.schema.removeField("pjqe0ahy")

  // remove
  collection.schema.removeField("kz26wjoy")

  // remove
  collection.schema.removeField("hc8zgbxq")

  // remove
  collection.schema.removeField("7mm3c5ze")

  // remove
  collection.schema.removeField("nu0fvivj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tsnl8mii",
    "name": "title",
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
    "id": "jmdzvcbr",
    "name": "ext_order_num",
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
    "id": "z2ndigpk",
    "name": "circulation",
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
    "id": "fvyri6wj",
    "name": "format",
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
    "id": "hggvgpxz",
    "name": "page_num",
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
    "id": "elgbdugh",
    "name": "fastening",
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
    "id": "2i7fgit7",
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
    "id": "klyykswh",
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
    "id": "7vifu5es",
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
    "id": "dzpxujy6",
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
    "id": "fl84vdz5",
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
    "id": "bh2cau0u",
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
    "id": "frv9nalf",
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
    "id": "7gyvo1dp",
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
    "id": "ebfxzova",
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
    "id": "t92fzq2e",
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
    "id": "ldkyrlbb",
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
    "id": "nirrtmth",
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
    "id": "nawkfsgf",
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
    "id": "walcfgf6",
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
    "id": "0hlmku9o",
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
    "id": "w9fqyljk",
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
    "id": "kponrd6n",
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
    "id": "afx1rhe8",
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
    "id": "fanekfhb",
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
    "id": "amgtg84d",
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
    "id": "jmtbxbez",
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
    "id": "b8jywcrx",
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
    "id": "dvkmn143",
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
    "id": "f0piu8ch",
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
    "id": "j6skfx03",
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
    "id": "c2jvvppa",
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
    "id": "0iooodhq",
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
    "id": "fktd7um6",
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
    "id": "iu2ie1d0",
    "name": "block_digital_works",
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
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.cover_lamination as cover_lamination,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.lamination_outgo as lamination_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo,\n  ow.block_risograph_works as block_risograph_works,\n  ow.block_digital_works as block_digital_works\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j6hfw9q8",
    "name": "title",
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
    "id": "4vzaqbt3",
    "name": "ext_order_num",
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
    "id": "vr4j0who",
    "name": "circulation",
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
    "id": "jiyorrki",
    "name": "format",
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
    "id": "nppfyhtt",
    "name": "page_num",
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
    "id": "l7fxywfj",
    "name": "fastening",
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
    "id": "omeo4bht",
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
    "id": "oc2e15dk",
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
    "id": "zfaejbjr",
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
    "id": "jasvc3wx",
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
    "id": "2jzaj4lg",
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
    "id": "20ujjktr",
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
    "id": "etdnuz5c",
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
    "id": "4utygiu3",
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
    "id": "c03tahfa",
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
    "id": "ppcilpad",
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
    "id": "hwxhmza8",
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
    "id": "ch6til9g",
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
    "id": "b8kea9yf",
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
    "id": "hwyuv8js",
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
    "id": "gq9gjr3a",
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
    "id": "tdnmkw9t",
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
    "id": "doxei2st",
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
    "id": "1puyrcaf",
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
    "id": "8au3jtsv",
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
    "id": "g0rnd0wb",
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
    "id": "zm642atv",
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
    "id": "kskhth9f",
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
    "id": "3zdr1qmu",
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
    "id": "pjqe0ahy",
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
    "id": "kz26wjoy",
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
    "id": "hc8zgbxq",
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
    "id": "7mm3c5ze",
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
    "id": "nu0fvivj",
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
  collection.schema.removeField("tsnl8mii")

  // remove
  collection.schema.removeField("jmdzvcbr")

  // remove
  collection.schema.removeField("z2ndigpk")

  // remove
  collection.schema.removeField("fvyri6wj")

  // remove
  collection.schema.removeField("hggvgpxz")

  // remove
  collection.schema.removeField("elgbdugh")

  // remove
  collection.schema.removeField("2i7fgit7")

  // remove
  collection.schema.removeField("klyykswh")

  // remove
  collection.schema.removeField("7vifu5es")

  // remove
  collection.schema.removeField("dzpxujy6")

  // remove
  collection.schema.removeField("fl84vdz5")

  // remove
  collection.schema.removeField("bh2cau0u")

  // remove
  collection.schema.removeField("frv9nalf")

  // remove
  collection.schema.removeField("7gyvo1dp")

  // remove
  collection.schema.removeField("ebfxzova")

  // remove
  collection.schema.removeField("t92fzq2e")

  // remove
  collection.schema.removeField("ldkyrlbb")

  // remove
  collection.schema.removeField("nirrtmth")

  // remove
  collection.schema.removeField("nawkfsgf")

  // remove
  collection.schema.removeField("walcfgf6")

  // remove
  collection.schema.removeField("0hlmku9o")

  // remove
  collection.schema.removeField("w9fqyljk")

  // remove
  collection.schema.removeField("kponrd6n")

  // remove
  collection.schema.removeField("afx1rhe8")

  // remove
  collection.schema.removeField("fanekfhb")

  // remove
  collection.schema.removeField("amgtg84d")

  // remove
  collection.schema.removeField("jmtbxbez")

  // remove
  collection.schema.removeField("b8jywcrx")

  // remove
  collection.schema.removeField("dvkmn143")

  // remove
  collection.schema.removeField("f0piu8ch")

  // remove
  collection.schema.removeField("j6skfx03")

  // remove
  collection.schema.removeField("c2jvvppa")

  // remove
  collection.schema.removeField("0iooodhq")

  // remove
  collection.schema.removeField("fktd7um6")

  // remove
  collection.schema.removeField("iu2ie1d0")

  return dao.saveCollection(collection)
})
