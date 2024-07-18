/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xr6qwo12yi35u2i")

  collection.options = {
    "query": "SELECT \"1\" as id"
  }

  // remove
  collection.schema.removeField("6opdvh65")

  // remove
  collection.schema.removeField("zvlpwoqv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xr6qwo12yi35u2i")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_multiplicity,\n  cover_format\nFROM (\n  SELECT\n    o.id as id,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format\n  FROM orders o,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fasterning) as cfr_fasterning\n  WHERE cover_papers.id = o.cover_paper\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fasterning.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_multiplicity,\n    NULL as cover_format\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

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
})
