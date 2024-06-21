/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pt7nh5cghvenwdq")

  collection.options = {
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.cover_lamination as cover_lamination,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.lamination_outgo as lamination_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo,\n  ow.block_risograph_works as block_risograph_works,\n  ow.block_digital_works as block_digital_works\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // remove
  collection.schema.removeField("lqbm7jtb")

  // remove
  collection.schema.removeField("vqpg3stt")

  // remove
  collection.schema.removeField("mi0dxvew")

  // remove
  collection.schema.removeField("ghluunak")

  // remove
  collection.schema.removeField("wvjv97b6")

  // remove
  collection.schema.removeField("fg43e2b3")

  // remove
  collection.schema.removeField("6je1lboz")

  // remove
  collection.schema.removeField("gkosqsy9")

  // remove
  collection.schema.removeField("xxwiltnx")

  // remove
  collection.schema.removeField("h8c3bpsg")

  // remove
  collection.schema.removeField("lvxd1xyk")

  // remove
  collection.schema.removeField("yygvvb8g")

  // remove
  collection.schema.removeField("oo22vvty")

  // remove
  collection.schema.removeField("hysm4d8c")

  // remove
  collection.schema.removeField("poztcvyk")

  // remove
  collection.schema.removeField("gni5pz3t")

  // remove
  collection.schema.removeField("6zzn81os")

  // remove
  collection.schema.removeField("842xwk9s")

  // remove
  collection.schema.removeField("mjzwdjex")

  // remove
  collection.schema.removeField("t8aofnav")

  // remove
  collection.schema.removeField("zwpdwnvy")

  // remove
  collection.schema.removeField("5ffev5zf")

  // remove
  collection.schema.removeField("c7hxjoep")

  // remove
  collection.schema.removeField("zb2ubuqh")

  // remove
  collection.schema.removeField("iqbo3oed")

  // remove
  collection.schema.removeField("t0fhf9ae")

  // remove
  collection.schema.removeField("8mocrqvl")

  // remove
  collection.schema.removeField("sgf0hfej")

  // remove
  collection.schema.removeField("jouqtogk")

  // remove
  collection.schema.removeField("vkh6jmla")

  // remove
  collection.schema.removeField("4ouquzbt")

  // remove
  collection.schema.removeField("bor7u88z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k7uar3yr",
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
    "id": "ginu6ztn",
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
    "id": "1xtdbp5y",
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
    "id": "swficdvi",
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
    "id": "bixjopnh",
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
    "id": "4hfsbsi1",
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
    "id": "3jckfugd",
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
    "id": "skbx6ahl",
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
    "id": "vsmml2x4",
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
    "id": "qomv6w1s",
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
    "id": "45sixqv9",
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
    "id": "bxxsgpi9",
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
    "id": "p1m8ldsw",
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
    "id": "uemmudbj",
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
    "id": "ifronwxy",
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
    "id": "jrvelx1w",
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
    "id": "xgmydn53",
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
    "id": "rzmyb0wl",
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
    "id": "77o1lhbp",
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
    "id": "lhy1rxlq",
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
    "id": "ldopanog",
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
    "id": "k21e0lt8",
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
    "id": "3okcs07n",
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
    "id": "yvytzouu",
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
    "id": "sycp6ydw",
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
    "id": "10vpvjmr",
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
    "id": "bmmfyxzz",
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
    "id": "gv7o050f",
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
    "id": "ikrregsi",
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
    "id": "uzncaqem",
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
    "id": "kyg5peue",
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
    "id": "1j5qdxqm",
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
    "id": "hwvmp3js",
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
    "id": "zrmyzrim",
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
    "query": "SELECT\n  op.id as id,\n  op.created as created,\n  op.title as title,\n  op.ext_order_num as ext_order_num,\n  op.circulation as circulation,\n  op.format as format,\n  op.page_num as page_num,\n  op.fastening as fastening,\n  op.block_color as block_color,\n  op.cover_color as cover_color,\n  op.block_departure_elements as block_departure_elements,\n  op.cover_departure_elements as cover_departure_elements,\n  op.block_paper as block_paper,\n  op.cover_paper as cover_paper,\n  op.block_printer as block_printer,\n  op.cover_printer as cover_printer,\n  op.cover_lamination as cover_lamination,\n  op.block_multiplicity as block_multiplicity,\n  op.block_format as block_format,\n  op.cover_multiplicity as cover_multiplicity,\n  op.cover_format as cover_format,\n  oec.estimated_circulation as estimated_circulation,\n  om.paper_outgo_1_name as paper_outgo_1_name,\n  om.paper_outgo_1_value as paper_outgo_1_value,\n  om.paper_outgo_2_name as paper_outgo_2_name,\n  om.paper_outgo_2_value as paper_outgo_2_value,\n  om.digital_color_printer_outgo as digital_color_printer_outgo,\n  om.digital_bw_printer_outgo as digital_bw_printer_outgo,\n  om.risograph_bw_printer_outgo as risograph_bw_printer_outgo,\n  om.hot_melt_adhesive_outgo as hot_melt_adhesive_outgo,\n  om.polyurethane_outgo as polyurethane_outgo,\n  om.lamination_outgo as lamination_outgo,\n  om.transparent_elements_outgo as transparent_elements_outgo,\n  om.digital_consumables_outgo as digital_consumables_outgo\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     orders_materials om,\n     orders_works ow\nWHERE op.id = oec.id AND op.id = om.id AND op.id = ow.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lqbm7jtb",
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
    "id": "vqpg3stt",
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
    "id": "mi0dxvew",
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
    "id": "ghluunak",
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
    "id": "wvjv97b6",
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
    "id": "fg43e2b3",
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
    "id": "6je1lboz",
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
    "id": "gkosqsy9",
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
    "id": "xxwiltnx",
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
    "id": "h8c3bpsg",
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
    "id": "lvxd1xyk",
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
    "id": "yygvvb8g",
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
    "id": "oo22vvty",
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
    "id": "hysm4d8c",
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
    "id": "poztcvyk",
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
    "id": "gni5pz3t",
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
    "id": "6zzn81os",
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
    "id": "842xwk9s",
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
    "id": "mjzwdjex",
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
    "id": "t8aofnav",
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
    "id": "zwpdwnvy",
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
    "id": "5ffev5zf",
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
    "id": "c7hxjoep",
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
    "id": "zb2ubuqh",
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
    "id": "iqbo3oed",
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
    "id": "t0fhf9ae",
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
    "id": "8mocrqvl",
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
    "id": "sgf0hfej",
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
    "id": "jouqtogk",
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
    "id": "vkh6jmla",
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
    "id": "4ouquzbt",
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
    "id": "bor7u88z",
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
  collection.schema.removeField("k7uar3yr")

  // remove
  collection.schema.removeField("ginu6ztn")

  // remove
  collection.schema.removeField("1xtdbp5y")

  // remove
  collection.schema.removeField("swficdvi")

  // remove
  collection.schema.removeField("bixjopnh")

  // remove
  collection.schema.removeField("4hfsbsi1")

  // remove
  collection.schema.removeField("3jckfugd")

  // remove
  collection.schema.removeField("skbx6ahl")

  // remove
  collection.schema.removeField("vsmml2x4")

  // remove
  collection.schema.removeField("qomv6w1s")

  // remove
  collection.schema.removeField("45sixqv9")

  // remove
  collection.schema.removeField("bxxsgpi9")

  // remove
  collection.schema.removeField("p1m8ldsw")

  // remove
  collection.schema.removeField("uemmudbj")

  // remove
  collection.schema.removeField("ifronwxy")

  // remove
  collection.schema.removeField("jrvelx1w")

  // remove
  collection.schema.removeField("xgmydn53")

  // remove
  collection.schema.removeField("rzmyb0wl")

  // remove
  collection.schema.removeField("77o1lhbp")

  // remove
  collection.schema.removeField("lhy1rxlq")

  // remove
  collection.schema.removeField("ldopanog")

  // remove
  collection.schema.removeField("k21e0lt8")

  // remove
  collection.schema.removeField("3okcs07n")

  // remove
  collection.schema.removeField("yvytzouu")

  // remove
  collection.schema.removeField("sycp6ydw")

  // remove
  collection.schema.removeField("10vpvjmr")

  // remove
  collection.schema.removeField("bmmfyxzz")

  // remove
  collection.schema.removeField("gv7o050f")

  // remove
  collection.schema.removeField("ikrregsi")

  // remove
  collection.schema.removeField("uzncaqem")

  // remove
  collection.schema.removeField("kyg5peue")

  // remove
  collection.schema.removeField("1j5qdxqm")

  // remove
  collection.schema.removeField("hwvmp3js")

  // remove
  collection.schema.removeField("zrmyzrim")

  return dao.saveCollection(collection)
})
