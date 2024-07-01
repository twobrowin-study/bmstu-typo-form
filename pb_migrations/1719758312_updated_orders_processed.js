/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tlytss5kj8zsn78")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  obp.block_color as block_color,\n  ocp.cover_color as cover_color,\n  obp.block_departure_elements as block_departure_elements,\n  ocp.cover_departure_elements as cover_departure_elements,\n  obp.block_paper as block_paper,\n  ocp.cover_paper as cover_paper,\n  obp.block_printer as block_printer,\n  ocp.cover_printer as cover_printer,\n  ocp.cover_lamination as cover_lamination,\n  obp.block_multiplicity as block_multiplicity,\n  obp.block_format as block_format,\n  ocp.cover_multiplicity as cover_multiplicity,\n  ocp.cover_format as cover_format\nFROM orders o,\n    formats,\n    fastenings,\n    orders_block_processed obp,\n    orders_cover_processed ocp\nWHERE formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   o.id = obp.id\nAND   o.id = ocp.id"
  }

  // remove
  collection.schema.removeField("clqg2htk")

  // remove
  collection.schema.removeField("otmzo9an")

  // remove
  collection.schema.removeField("mumfhaid")

  // remove
  collection.schema.removeField("qyo3ywsw")

  // remove
  collection.schema.removeField("eqwvc9e3")

  // remove
  collection.schema.removeField("valxlpeq")

  // remove
  collection.schema.removeField("rpfgazeh")

  // remove
  collection.schema.removeField("wvm96c23")

  // remove
  collection.schema.removeField("p7iq9xup")

  // remove
  collection.schema.removeField("myhu6qki")

  // remove
  collection.schema.removeField("g9maqris")

  // remove
  collection.schema.removeField("mu3s9gho")

  // remove
  collection.schema.removeField("7zpjxvfa")

  // remove
  collection.schema.removeField("bqlgs4nm")

  // remove
  collection.schema.removeField("577wpcdu")

  // remove
  collection.schema.removeField("4tnnjitf")

  // remove
  collection.schema.removeField("mrmcpuma")

  // remove
  collection.schema.removeField("n8kyloga")

  // remove
  collection.schema.removeField("ivxy5ada")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a2scwwg1",
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
    "id": "4a2kbk2z",
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
    "id": "hrv2lqtb",
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
    "id": "gwwhgbx0",
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
    "id": "dtskto0k",
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
    "id": "k9mqkqwr",
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
    "id": "ucevjhxd",
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
    "id": "1q5kqj9x",
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
    "id": "cwjhfrem",
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
    "id": "nrw3paoi",
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
    "id": "afpmxrca",
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
    "id": "drjmd8ht",
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
    "id": "ximzk69k",
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
    "id": "csbuvtae",
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
    "id": "vajc5vuf",
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
    "id": "eamaogc2",
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
    "id": "qw7dtxfr",
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
    "id": "hgilgq9k",
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
    "id": "63pgorqb",
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
    "query": "SELECT\n  id,\n  created,\n  title,\n  ext_order_num,\n  circulation,\n  format,\n  page_num,\n  fastening,\n  block_color,\n  cover_color,\n  block_departure_elements,\n  cover_departure_elements,\n  block_paper,\n  cover_paper,\n  block_printer,\n  cover_printer,\n  cover_lamination,\n  block_multiplicity,\n  block_format,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    o.created as created,\n    o.title as title,\n    o.ext_order_num as ext_order_num,\n    o.circulation as circulation,\n    formats.name as format,\n    o.page_num as page_num,\n    fastenings.name as fastening,\n    block_colors.name as block_color,\n    cover_colors.name as cover_color,\n    o.block_departure_elements as block_departure_elements,\n    o.cover_departure_elements as cover_departure_elements,\n    block_papers.name as block_paper,\n    cover_papers.name as cover_paper,\n    block_printers.name as block_printer,\n    cover_printers.name as cover_printer,\n    o.cover_lamination as cover_lamination,\n    o.block_multiplicity as block_multiplicity,\n    o.block_format as block_format,\n    o.cover_multiplicity as cover_multiplicity,\n    o.cover_format as cover_format\n  FROM orders o,\n      formats,\n      fastenings,\n      colors block_colors,\n      colors cover_colors,\n      papers block_papers,\n      papers cover_papers,\n      printers block_printers,\n      printers cover_printers\n  WHERE formats.id = o.format\n  AND   fastenings.id = o.fastening\n  AND   block_colors.id = o.block_color\n  AND   cover_colors.id = o.cover_color\n  AND   block_papers.id = o.block_paper\n  AND   cover_papers.id = o.cover_paper\n  AND   block_printers.id = o.block_printer\n  AND   cover_printers.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.created as created,\n    o.title as title,\n    o.ext_order_num as ext_order_num,\n    o.circulation as circulation,\n    formats.name as format,\n    o.page_num as page_num,\n    fastenings.name as fastening,\n    block_colors.name as block_color,\n    NULL as cover_color,\n    o.block_departure_elements as block_departure_elements,\n    NULL as cover_departure_elements,\n    block_papers.name as block_paper,\n    cover_papers.name as cover_paper,\n    block_printers.name as block_printer,\n    NULL as cover_printer,\n    NULL as cover_lamination,\n    o.block_multiplicity as block_multiplicity,\n    o.block_format as block_format,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n      formats,\n      fastenings,\n      colors block_colors,\n      papers block_papers,\n      papers cover_papers,\n      printers block_printers\n  WHERE formats.id = o.format\n  AND   fastenings.id = o.fastening\n  AND   block_colors.id = o.block_color\n  AND   block_papers.id = o.block_paper\n  AND   cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n  AND   block_printers.id = o.block_printer\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "clqg2htk",
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
    "id": "otmzo9an",
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
    "id": "mumfhaid",
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
    "id": "qyo3ywsw",
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
    "id": "eqwvc9e3",
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
    "id": "valxlpeq",
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
    "id": "rpfgazeh",
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
    "id": "wvm96c23",
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
    "id": "p7iq9xup",
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
    "id": "myhu6qki",
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
    "id": "g9maqris",
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
    "id": "mu3s9gho",
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
    "id": "7zpjxvfa",
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
    "id": "bqlgs4nm",
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
    "id": "577wpcdu",
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
    "id": "4tnnjitf",
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
    "id": "mrmcpuma",
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
    "id": "n8kyloga",
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
    "id": "ivxy5ada",
    "name": "cover_format",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("a2scwwg1")

  // remove
  collection.schema.removeField("4a2kbk2z")

  // remove
  collection.schema.removeField("hrv2lqtb")

  // remove
  collection.schema.removeField("gwwhgbx0")

  // remove
  collection.schema.removeField("dtskto0k")

  // remove
  collection.schema.removeField("k9mqkqwr")

  // remove
  collection.schema.removeField("ucevjhxd")

  // remove
  collection.schema.removeField("1q5kqj9x")

  // remove
  collection.schema.removeField("cwjhfrem")

  // remove
  collection.schema.removeField("nrw3paoi")

  // remove
  collection.schema.removeField("afpmxrca")

  // remove
  collection.schema.removeField("drjmd8ht")

  // remove
  collection.schema.removeField("ximzk69k")

  // remove
  collection.schema.removeField("csbuvtae")

  // remove
  collection.schema.removeField("vajc5vuf")

  // remove
  collection.schema.removeField("eamaogc2")

  // remove
  collection.schema.removeField("qw7dtxfr")

  // remove
  collection.schema.removeField("hgilgq9k")

  // remove
  collection.schema.removeField("63pgorqb")

  return dao.saveCollection(collection)
})
