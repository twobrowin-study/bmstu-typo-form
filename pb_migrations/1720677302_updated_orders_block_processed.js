/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fxchdwbggv9j70e")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  block_colors.name as block_color,\n  o.block_departure_elements as block_departure_elements,\n  block_papers.name as block_paper,\n  block_printers.name as block_printer,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format\nFROM orders o,\n     colors block_colors,\n     papers block_papers,\n     printers block_printers,\n     block_format_rules bfr,\n     json_each(bfr.format) as bfr_format,\n     json_each(bfr.printer) as bfr_printer\nWHERE bfr_format.value = o.format\nAND   bfr_printer.value = o.block_printer\nAND   block_colors.id = o.block_color\nAND   block_papers.id = o.block_paper\nAND   block_printers.id = o.block_printer"
  }

  // remove
  collection.schema.removeField("oep6rznr")

  // remove
  collection.schema.removeField("yklkkqi0")

  // remove
  collection.schema.removeField("aw8cowhu")

  // remove
  collection.schema.removeField("roeqlcdl")

  // remove
  collection.schema.removeField("yyjuqpdm")

  // remove
  collection.schema.removeField("lpxgfqct")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ucedps4m",
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
    "id": "9nof8stq",
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
    "id": "nqqhia2k",
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
    "id": "ostqft64",
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
    "id": "onwbouzy",
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
    "id": "95xec9n2",
    "name": "block_format",
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
  const collection = dao.findCollectionByNameOrId("fxchdwbggv9j70e")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  block_colors.name as block_color,\n  o.block_departure_elements as block_departure_elements,\n  block_papers.name as block_paper,\n  block_printers.name as block_printer,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format\nFROM orders o,\n     colors block_colors,\n     papers block_papers,\n     printers block_printers,\n     block_format_rules bfr,\n     json_each(bfr.format) as bfr_format,\n     json_each(bfr.printer) as bfr_printer,\n     json_each(bfr.color) as bfr_color\nWHERE bfr_format.value = o.format\nAND   bfr_printer.value = o.block_printer\nAND   bfr_color.value = o.block_color\nAND   block_colors.id = o.block_color\nAND   block_papers.id = o.block_paper\nAND   block_printers.id = o.block_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oep6rznr",
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
    "id": "yklkkqi0",
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
    "id": "aw8cowhu",
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
    "id": "roeqlcdl",
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
    "id": "yyjuqpdm",
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
    "id": "lpxgfqct",
    "name": "block_format",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("ucedps4m")

  // remove
  collection.schema.removeField("9nof8stq")

  // remove
  collection.schema.removeField("nqqhia2k")

  // remove
  collection.schema.removeField("ostqft64")

  // remove
  collection.schema.removeField("onwbouzy")

  // remove
  collection.schema.removeField("95xec9n2")

  return dao.saveCollection(collection)
})
