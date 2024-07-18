/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fxchdwbggv9j70e")

  collection.options = {
    "query": "SELECT\n  id,\n  block_color,\n  block_departure_elements,\n  block_paper,\n  block_printer,\n  block_multiplicity,\n  block_format\nFROM (\n  SELECT\n    o.id as id,\n    block_colors.name as block_color,\n    o.block_departure_elements as block_departure_elements,\n    block_papers.name as block_paper,\n    block_printers.name as block_printer,\n    bfr.multiplicity as block_multiplicity,\n    (CASE\n      WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n      ELSE bfr.format_wo_departure_elements\n    END) as block_format\n  FROM orders o,\n      order_types ot,\n      colors block_colors,\n      papers block_papers,\n      printers block_printers,\n      block_format_rules bfr,\n      json_each(bfr.format) as bfr_format,\n      json_each(bfr.printer) as bfr_printer\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   bfr_format.value = o.format\n  AND   bfr_printer.value = o.block_printer\n  AND   block_colors.id = o.block_color\n  AND   block_papers.id = o.block_paper\n  AND   block_printers.id = o.block_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as block_color,\n    NULL as block_departure_elements,\n    NULL as block_paper,\n    NULL as block_printer,\n    NULL as block_multiplicity,\n    NULL as block_format\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)\n"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uvxuccd4",
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
    "id": "ukwwdghw",
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
    "id": "hovbymk2",
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
    "id": "hekmgt1k",
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
    "id": "2ktfdr03",
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
    "id": "dnhmrwvp",
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
    "query": "SELECT\n  o.id as id,\n  block_colors.name as block_color,\n  o.block_departure_elements as block_departure_elements,\n  block_papers.name as block_paper,\n  block_printers.name as block_printer,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format\nFROM orders o,\n     colors block_colors,\n     papers block_papers,\n     printers block_printers,\n     block_format_rules bfr,\n     json_each(bfr.format) as bfr_format,\n     json_each(bfr.printer) as bfr_printer\nWHERE bfr_format.value = o.format\nAND   bfr_printer.value = o.block_printer\nAND   block_colors.id = o.block_color\nAND   block_papers.id = o.block_paper\nAND   block_printers.id = o.block_printer"
  }

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

  // remove
  collection.schema.removeField("uvxuccd4")

  // remove
  collection.schema.removeField("ukwwdghw")

  // remove
  collection.schema.removeField("hovbymk2")

  // remove
  collection.schema.removeField("hekmgt1k")

  // remove
  collection.schema.removeField("2ktfdr03")

  // remove
  collection.schema.removeField("dnhmrwvp")

  return dao.saveCollection(collection)
})
