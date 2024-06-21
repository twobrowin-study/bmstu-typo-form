/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tlytss5kj8zsn78")

  collection.options = {
    "query": "SELECT\n  id,\n  created,\n  title,\n  ext_order_num,\n  circulation,\n  format,\n  page_num,\n  fastening,\n  block_color,\n  cover_color,\n  block_departure_elements,\n  cover_departure_elements,\n  block_paper,\n  cover_paper,\n  block_printer,\n  cover_printer,\n  cover_lamination,\n  block_multiplicity,\n  block_format,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    o.created as created,\n    o.title as title,\n    o.ext_order_num as ext_order_num,\n    o.circulation as circulation,\n    formats.name as format,\n    o.page_num as page_num,\n    fastenings.name as fastening,\n    block_colors.name as block_color,\n    cover_colors.name as cover_color,\n    o.block_departure_elements as block_departure_elements,\n    o.cover_departure_elements as cover_departure_elements,\n    block_papers.name as block_paper,\n    cover_papers.name as cover_paper,\n    block_printers.name as block_printer,\n    cover_printers.name as cover_printer,\n    o.cover_lamination as cover_lamination,\n    o.block_multiplicity as block_multiplicity,\n    o.block_format as block_format,\n    o.cover_multiplicity as cover_multiplicity,\n    o.cover_format as cover_format\n  FROM orders o,\n      formats,\n      fastenings,\n      colors block_colors,\n      colors cover_colors,\n      papers block_papers,\n      papers cover_papers,\n      printers block_printers,\n      printers cover_printers\n  WHERE formats.id = o.format\n  AND   fastenings.id = o.fastening\n  AND   block_colors.id = o.block_color\n  AND   cover_colors.id = o.cover_color\n  AND   block_papers.id = o.block_paper\n  AND   cover_papers.id = o.cover_paper\n  AND   block_printers.id = o.block_printer\n  AND   cover_printers.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.created as created,\n    o.title as title,\n    o.ext_order_num as ext_order_num,\n    o.circulation as circulation,\n    formats.name as format,\n    o.page_num as page_num,\n    fastenings.name as fastening,\n    block_colors.name as block_color,\n    NULL as cover_color,\n    o.block_departure_elements as block_departure_elements,\n    o.cover_departure_elements as cover_departure_elements,\n    block_papers.name as block_paper,\n    cover_papers.name as cover_paper,\n    block_printers.name as block_printer,\n    NULL as cover_printer,\n    o.cover_lamination as cover_lamination,\n    o.block_multiplicity as block_multiplicity,\n    o.block_format as block_format,\n    o.cover_multiplicity as cover_multiplicity,\n    o.cover_format as cover_format\n  FROM orders o,\n      formats,\n      fastenings,\n      colors block_colors,\n      papers block_papers,\n      papers cover_papers,\n      printers block_printers\n  WHERE formats.id = o.format\n  AND   fastenings.id = o.fastening\n  AND   block_colors.id = o.block_color\n  AND   block_papers.id = o.block_paper\n  AND   cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n  AND   block_printers.id = o.block_printer\n)\n"
  }

  // remove
  collection.schema.removeField("pksz8mxv")

  // remove
  collection.schema.removeField("n7p0zql1")

  // remove
  collection.schema.removeField("bzwicbpx")

  // remove
  collection.schema.removeField("ogk5arjj")

  // remove
  collection.schema.removeField("ykhotlu0")

  // remove
  collection.schema.removeField("q8hhpqpv")

  // remove
  collection.schema.removeField("jpsx10hz")

  // remove
  collection.schema.removeField("k5fxtgpp")

  // remove
  collection.schema.removeField("nmwnvmmo")

  // remove
  collection.schema.removeField("r7xw3jrx")

  // remove
  collection.schema.removeField("kxf9ptde")

  // remove
  collection.schema.removeField("pqdlnr0d")

  // remove
  collection.schema.removeField("woauojaw")

  // remove
  collection.schema.removeField("hvpg4mab")

  // remove
  collection.schema.removeField("ww5j1k74")

  // remove
  collection.schema.removeField("ue6aj6os")

  // remove
  collection.schema.removeField("zd79zxvx")

  // remove
  collection.schema.removeField("ytoxy4os")

  // remove
  collection.schema.removeField("hvijhbdf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aqyw1qnp",
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
    "id": "crkzilwf",
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
    "id": "mhapcok7",
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
    "id": "uiwoupom",
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
    "id": "xqe4bua5",
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
    "id": "h8kmrfqf",
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
    "id": "3rcfsmpe",
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
    "id": "sndo2w8n",
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
    "id": "vx6zbakz",
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
    "id": "ujcvja8f",
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
    "id": "mz3ehfgc",
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
    "id": "szwgnueg",
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
    "id": "cdhuitzq",
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
    "id": "pzsdbmhz",
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
    "id": "chmnr51d",
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
    "id": "4migltz3",
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
    "id": "yalpj7d4",
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
    "id": "7whd8vx5",
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
    "id": "rvvxyhsq",
    "name": "cover_format",
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
  const collection = dao.findCollectionByNameOrId("tlytss5kj8zsn78")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  block_colors.name as block_color,\n  cover_colors.name as cover_color,\n  o.block_departure_elements as block_departure_elements,\n  o.cover_departure_elements as cover_departure_elements,\n  block_papers.name as block_paper,\n  cover_papers.name as cover_paper,\n  block_printers.name as block_printer,\n  cover_printers.name as cover_printer,\n  o.cover_lamination as cover_lamination,\n  o.block_multiplicity as block_multiplicity,\n  o.block_format as block_format,\n  o.cover_multiplicity as cover_multiplicity,\n  o.cover_format as cover_format\nFROM orders o,\n     formats,\n     fastenings,\n     colors block_colors,\n     colors cover_colors,\n     papers block_papers,\n     papers cover_papers,\n     printers block_printers,\n     printers cover_printers\nWHERE formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pksz8mxv",
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
    "id": "n7p0zql1",
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
    "id": "bzwicbpx",
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
    "id": "ogk5arjj",
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
    "id": "ykhotlu0",
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
    "id": "q8hhpqpv",
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
    "id": "jpsx10hz",
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
    "id": "k5fxtgpp",
    "name": "cover_color",
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
    "id": "nmwnvmmo",
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
    "id": "r7xw3jrx",
    "name": "cover_departure_elements",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kxf9ptde",
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
    "id": "pqdlnr0d",
    "name": "cover_paper",
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
    "id": "woauojaw",
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
    "id": "hvpg4mab",
    "name": "cover_printer",
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
    "id": "ww5j1k74",
    "name": "cover_lamination",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ue6aj6os",
    "name": "block_multiplicity",
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
    "id": "zd79zxvx",
    "name": "block_format",
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
    "id": "ytoxy4os",
    "name": "cover_multiplicity",
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
    "id": "hvijhbdf",
    "name": "cover_format",
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

  // remove
  collection.schema.removeField("aqyw1qnp")

  // remove
  collection.schema.removeField("crkzilwf")

  // remove
  collection.schema.removeField("mhapcok7")

  // remove
  collection.schema.removeField("uiwoupom")

  // remove
  collection.schema.removeField("xqe4bua5")

  // remove
  collection.schema.removeField("h8kmrfqf")

  // remove
  collection.schema.removeField("3rcfsmpe")

  // remove
  collection.schema.removeField("sndo2w8n")

  // remove
  collection.schema.removeField("vx6zbakz")

  // remove
  collection.schema.removeField("ujcvja8f")

  // remove
  collection.schema.removeField("mz3ehfgc")

  // remove
  collection.schema.removeField("szwgnueg")

  // remove
  collection.schema.removeField("cdhuitzq")

  // remove
  collection.schema.removeField("pzsdbmhz")

  // remove
  collection.schema.removeField("chmnr51d")

  // remove
  collection.schema.removeField("4migltz3")

  // remove
  collection.schema.removeField("yalpj7d4")

  // remove
  collection.schema.removeField("7whd8vx5")

  // remove
  collection.schema.removeField("rvvxyhsq")

  return dao.saveCollection(collection)
})
