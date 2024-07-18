/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sleziq6ago64l8w")

  collection.options = {
    "query": "SELECT id from orders"
  }

  // remove
  collection.schema.removeField("bpw1jxyz")

  // remove
  collection.schema.removeField("jb2tt0kh")

  // remove
  collection.schema.removeField("hywfamdm")

  // remove
  collection.schema.removeField("6wggzuhy")

  // remove
  collection.schema.removeField("m66rpjv2")

  // remove
  collection.schema.removeField("z3uo3aym")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sleziq6ago64l8w")

  collection.options = {
    "query": "SELECT id,\n       is_block_printer_color_digital,\n       is_cover_printer_color_digital,\n       is_block_printer_bw_digital,\n       is_cover_printer_bw_digital,\n       is_block_printer_bw_risograph,\n       is_cover_printer_bw_risograph\nFROM (\n  SELECT\n    o.id as id,\n    (block_printers.is_digital AND block_colors.is_color) as is_block_printer_color_digital,\n    (cover_printers.is_digital AND cover_colors.is_color) as is_cover_printer_color_digital,\n    (block_printers.is_digital AND NOT block_colors.is_color) as is_block_printer_bw_digital,\n    (cover_printers.is_digital AND NOT cover_colors.is_color) as is_cover_printer_bw_digital,\n    (block_printers.is_risograph AND NOT block_colors.is_color) as is_block_printer_bw_risograph,\n    (cover_printers.is_risograph AND NOT cover_colors.is_color) as is_cover_printer_bw_risograph\n  FROM orders o,\n      orders_estimated_circulations oec,\n      colors block_colors,\n      colors cover_colors,\n      printers block_printers,\n      printers cover_printers\n  WHERE o.id = oec.id\n  AND   block_colors.id = o.block_color\n  AND   cover_colors.id = o.cover_color\n  AND   block_printers.id = o.block_printer\n  AND   cover_printers.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    (block_printers.is_digital AND block_colors.is_color) as is_block_printer_color_digital,\n    NULL as is_cover_printer_color_digital,\n    (block_printers.is_digital AND NOT block_colors.is_color) as is_block_printer_bw_digital,\n    NULL as is_cover_printer_bw_digital,\n    (block_printers.is_risograph AND NOT block_colors.is_color) as is_block_printer_bw_risograph,\n    NULL as is_cover_printer_bw_risograph\n  FROM orders o,\n      orders_estimated_circulations oec,\n      papers cover_papers,\n      colors block_colors,\n      printers block_printers\n  WHERE o.id = oec.id\n  AND   cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n  AND   block_colors.id = o.block_color\n  AND   block_printers.id = o.block_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bpw1jxyz",
    "name": "is_block_printer_color_digital",
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
    "id": "jb2tt0kh",
    "name": "is_cover_printer_color_digital",
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
    "id": "hywfamdm",
    "name": "is_block_printer_bw_digital",
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
    "id": "6wggzuhy",
    "name": "is_cover_printer_bw_digital",
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
    "id": "m66rpjv2",
    "name": "is_block_printer_bw_risograph",
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
    "id": "z3uo3aym",
    "name": "is_cover_printer_bw_risograph",
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
