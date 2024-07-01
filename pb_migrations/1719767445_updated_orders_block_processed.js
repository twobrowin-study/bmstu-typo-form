/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fxchdwbggv9j70e")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  block_colors.name as block_color,\n  o.block_departure_elements as block_departure_elements,\n  block_papers.name as block_paper,\n  block_printers.name as block_printer,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format\nFROM orders o,\n     colors block_colors,\n     papers block_papers,\n     printers block_printers,\n     block_format_rules bfr\nWHERE bfr.format = o.format\nAND   block_colors.id = o.block_color\nAND   block_papers.id = o.block_paper\nAND   block_printers.id = o.block_printer"
  }

  // remove
  collection.schema.removeField("vjuwwlxl")

  // remove
  collection.schema.removeField("rab9skio")

  // remove
  collection.schema.removeField("4gsm8pwx")

  // remove
  collection.schema.removeField("0ivyzfmn")

  // remove
  collection.schema.removeField("ec6kvmph")

  // remove
  collection.schema.removeField("xwffkjvi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lsjbza4s",
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
    "id": "juvhit2q",
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
    "id": "awkgpofh",
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
    "id": "9c2gs9cj",
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
    "id": "hqefm4uy",
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
    "id": "2ahgy1zd",
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
    "query": "SELECT\n  o.id as id,\n  block_colors.name as block_color,\n  o.block_departure_elements as block_departure_elements,\n  block_papers.name as block_paper,\n  block_printers.name as block_printer,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format\nFROM orders o,\n     colors block_colors,\n     papers block_papers,\n     printers block_printers,\n     block_format_rules bfr\nWHERE bfr.format = o.format\n  AND   block_colors.id = o.block_color\n  AND   block_papers.id = o.block_paper\n  AND   block_printers.id = o.block_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vjuwwlxl",
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
    "id": "rab9skio",
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
    "id": "4gsm8pwx",
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
    "id": "0ivyzfmn",
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
    "id": "ec6kvmph",
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
    "id": "xwffkjvi",
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
  collection.schema.removeField("lsjbza4s")

  // remove
  collection.schema.removeField("juvhit2q")

  // remove
  collection.schema.removeField("awkgpofh")

  // remove
  collection.schema.removeField("9c2gs9cj")

  // remove
  collection.schema.removeField("hqefm4uy")

  // remove
  collection.schema.removeField("2ahgy1zd")

  return dao.saveCollection(collection)
})
