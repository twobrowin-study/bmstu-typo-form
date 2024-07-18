/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xr6qwo12yi35u2i")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_papers.id = o.cover_paper\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // remove
  collection.schema.removeField("s64ji1qh")

  // remove
  collection.schema.removeField("v5qri3to")

  // remove
  collection.schema.removeField("rbgb6sx7")

  // remove
  collection.schema.removeField("qqlj3gom")

  // remove
  collection.schema.removeField("r1eibhmb")

  // remove
  collection.schema.removeField("gwqefemp")

  // remove
  collection.schema.removeField("ntpten0h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6opdvh65",
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
    "id": "zvlpwoqv",
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
  const collection = dao.findCollectionByNameOrId("xr6qwo12yi35u2i")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_color,\n  cover_departure_elements,\n  cover_paper,\n  is_cover_paper_empty,\n  cover_printer,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cover_colors.name as cover_color,\n    o.cover_departure_elements as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    FALSE as is_cover_paper_empty,\n    cover_printers.name as cover_printer,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       colors cover_colors,\n       papers cover_papers,\n       printers cover_printers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_colors.id = o.cover_color\n  AND   cover_papers.id = o.cover_paper\n  AND   NOT cover_papers.is_empty\n  AND   cover_printers.id = o.cover_printer\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_color,\n    NULL as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    TRUE as is_cover_paper_empty,\n    NULL as cover_printer,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s64ji1qh",
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
    "id": "v5qri3to",
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
    "id": "rbgb6sx7",
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
    "id": "qqlj3gom",
    "name": "is_cover_paper_empty",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r1eibhmb",
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
    "id": "gwqefemp",
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
    "id": "ntpten0h",
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
  collection.schema.removeField("6opdvh65")

  // remove
  collection.schema.removeField("zvlpwoqv")

  return dao.saveCollection(collection)
})
