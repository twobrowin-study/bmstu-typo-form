/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_color,\n  cover_departure_elements,\n  cover_paper,\n  is_cover_paper_empty,\n  cover_printer,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cover_colors.name as cover_color,\n    o.cover_departure_elements as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    FALSE as is_cover_paper_empty,\n    cover_printers.name as cover_printer,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       colors cover_colors,\n       papers cover_papers,\n       printers cover_printers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_colors.id = o.cover_color\n  AND   cover_papers.id = o.cover_paper\n  AND   NOT cover_papers.is_empty\n  AND   cover_printers.id = o.cover_printer\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_color,\n    NULL as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    TRUE as is_cover_paper_empty,\n    NULL as cover_printer,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // remove
  collection.schema.removeField("0cmrtc7c")

  // remove
  collection.schema.removeField("haiwu5tg")

  // remove
  collection.schema.removeField("f5v71cuj")

  // remove
  collection.schema.removeField("x6yf06sl")

  // remove
  collection.schema.removeField("1th2ycv1")

  // remove
  collection.schema.removeField("q45qz6oo")

  // remove
  collection.schema.removeField("5ttcgeg5")

  // remove
  collection.schema.removeField("2sw92icv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hlqpptha",
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
    "id": "cbbjpfui",
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
    "id": "lkg631nm",
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
    "id": "me7nab1w",
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
    "id": "spbecbgm",
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
    "id": "6tqnhb9j",
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
    "id": "vw3jqcj2",
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
    "query": "SELECT\n  id,\n  cover_color,\n  cover_departure_elements,\n  cover_paper,\n  is_cover_paper_empty,\n  cover_printer,\n  cover_lamination,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cover_colors.name as cover_color,\n    o.cover_departure_elements as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    FALSE as is_cover_paper_empty,\n    cover_printers.name as cover_printer,\n    o.cover_lamination as cover_lamination,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       colors cover_colors,\n       papers cover_papers,\n       printers cover_printers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_colors.id = o.cover_color\n  AND   cover_papers.id = o.cover_paper\n  AND   NOT cover_papers.is_empty\n  AND   cover_printers.id = o.cover_printer\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_color,\n    NULL as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    TRUE as is_cover_paper_empty,\n    NULL as cover_printer,\n    NULL as cover_lamination,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0cmrtc7c",
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
    "id": "haiwu5tg",
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
    "id": "f5v71cuj",
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
    "id": "x6yf06sl",
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
    "id": "1th2ycv1",
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
    "id": "q45qz6oo",
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
    "id": "5ttcgeg5",
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
    "id": "2sw92icv",
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
  collection.schema.removeField("hlqpptha")

  // remove
  collection.schema.removeField("cbbjpfui")

  // remove
  collection.schema.removeField("lkg631nm")

  // remove
  collection.schema.removeField("me7nab1w")

  // remove
  collection.schema.removeField("spbecbgm")

  // remove
  collection.schema.removeField("6tqnhb9j")

  // remove
  collection.schema.removeField("vw3jqcj2")

  return dao.saveCollection(collection)
})
