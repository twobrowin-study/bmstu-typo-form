/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_color,\n  cover_departure_elements,\n  cover_paper,\n  is_cover_paper_empty,\n  cover_printer,\n  cover_lamination,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cover_colors.name as cover_color,\n    o.cover_departure_elements as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    FALSE as is_cover_paper_empty,\n    cover_printers.name as cover_printer,\n    o.cover_lamination as cover_lamination,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       colors cover_colors,\n       papers cover_papers,\n       printers cover_printers,\n       cover_format_rules cfr,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_colors.id = o.cover_color\n  AND   cover_papers.id = o.cover_paper\n  AND   NOT cover_papers.is_empty\n  AND   cover_printers.id = o.cover_printer\n  AND   cfr.format = o.format\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_color,\n    NULL as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    TRUE as is_cover_paper_empty,\n    NULL as cover_printer,\n    NULL as cover_lamination,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // remove
  collection.schema.removeField("unxppubu")

  // remove
  collection.schema.removeField("b2hmuatq")

  // remove
  collection.schema.removeField("eyazeqn7")

  // remove
  collection.schema.removeField("47qa1khm")

  // remove
  collection.schema.removeField("d9smgjgg")

  // remove
  collection.schema.removeField("lhjbnbym")

  // remove
  collection.schema.removeField("gscyvzfo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmzoceoq",
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
    "id": "nukhyxqp",
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
    "id": "a5wgswog",
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
    "id": "albbli2b",
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
    "id": "06onopcp",
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
    "id": "khpla2ih",
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
    "id": "1lzxvgjs",
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
    "id": "xj7cjd0d",
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
    "query": "SELECT\n  id,\n  cover_color,\n  cover_departure_elements,\n  cover_paper,\n  cover_printer,\n  cover_lamination,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cover_colors.name as cover_color,\n    o.cover_departure_elements as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    cover_printers.name as cover_printer,\n    o.cover_lamination as cover_lamination,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       colors cover_colors,\n       papers cover_papers,\n       printers cover_printers,\n       cover_format_rules cfr,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_colors.id = o.cover_color\n  AND   cover_papers.id = o.cover_paper\n  AND   NOT cover_papers.is_empty\n  AND   cover_printers.id = o.cover_printer\n  AND   cfr.format = o.format\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_color,\n    NULL as cover_departure_elements,\n    cover_papers.name as cover_paper,\n    NULL as cover_printer,\n    NULL as cover_lamination,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "unxppubu",
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
    "id": "b2hmuatq",
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
    "id": "eyazeqn7",
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
    "id": "47qa1khm",
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
    "id": "d9smgjgg",
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
    "id": "lhjbnbym",
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
    "id": "gscyvzfo",
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
  collection.schema.removeField("cmzoceoq")

  // remove
  collection.schema.removeField("nukhyxqp")

  // remove
  collection.schema.removeField("a5wgswog")

  // remove
  collection.schema.removeField("albbli2b")

  // remove
  collection.schema.removeField("06onopcp")

  // remove
  collection.schema.removeField("khpla2ih")

  // remove
  collection.schema.removeField("1lzxvgjs")

  // remove
  collection.schema.removeField("xj7cjd0d")

  return dao.saveCollection(collection)
})
