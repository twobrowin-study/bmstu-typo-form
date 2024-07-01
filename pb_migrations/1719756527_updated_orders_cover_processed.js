/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_color,\n  cover_departure_elements,\n  cover_paper,\n  cover_printer,\n  cover_lamination,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cover_colors.name as cover_color,\n    o.cover_departure_elements as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    cover_printers.name as cover_printer,\n    o.cover_lamination as cover_lamination,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       colors cover_colors,\n       papers cover_papers,\n       printers cover_printers,\n       cover_format_rules cfr,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_colors.id = o.cover_color\n  AND   cover_papers.id = o.cover_paper\n  AND   cover_printers.id = o.cover_printer\n  AND   cfr.format = o.format\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_color,\n    NULL as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    NULL as cover_printer,\n    NULL as cover_lamination,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // remove
  collection.schema.removeField("rsa8spev")

  // remove
  collection.schema.removeField("dorwzq2y")

  // remove
  collection.schema.removeField("vwt7fgka")

  // remove
  collection.schema.removeField("jch54tec")

  // remove
  collection.schema.removeField("465qopua")

  // remove
  collection.schema.removeField("htzbq2rz")

  // remove
  collection.schema.removeField("vac3kczb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "io1nq09u",
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
    "id": "bwnljfpk",
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
    "id": "lvas2syi",
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
    "id": "ppocu3ap",
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
    "id": "msqj4lir",
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
    "id": "fxsek4yw",
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
    "id": "cfzo0ggu",
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
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f")

  collection.options = {
    "query": "SELECT\n    o.id as id,\n    cover_colors.name as cover_color,\n    o.cover_departure_elements as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    cover_printers.name as cover_printer,\n    o.cover_lamination as cover_lamination,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       colors cover_colors,\n       papers cover_papers,\n       printers cover_printers,\n       cover_format_rules cfr,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_colors.id = o.cover_color\n  AND   cover_papers.id = o.cover_paper\n  AND   cover_printers.id = o.cover_printer\n  AND   cfr.format = o.format\n  AND   cfr_fasterning.value = o.fastening"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rsa8spev",
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
    "id": "dorwzq2y",
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
    "id": "vwt7fgka",
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
    "id": "jch54tec",
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
    "id": "465qopua",
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
    "id": "htzbq2rz",
    "name": "cover_multiplicity",
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
    "id": "vac3kczb",
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
  collection.schema.removeField("io1nq09u")

  // remove
  collection.schema.removeField("bwnljfpk")

  // remove
  collection.schema.removeField("lvas2syi")

  // remove
  collection.schema.removeField("ppocu3ap")

  // remove
  collection.schema.removeField("msqj4lir")

  // remove
  collection.schema.removeField("fxsek4yw")

  // remove
  collection.schema.removeField("cfzo0ggu")

  return dao.saveCollection(collection)
})
