/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic")

  collection.name = "orders_estimated_circulations"
  collection.options = {
    "query": "SELECT o.id as id, ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o"
  }

  // remove
  collection.schema.removeField("2y3c0ssk")

  // remove
  collection.schema.removeField("jafdbg5o")

  // remove
  collection.schema.removeField("6x6eeidn")

  // remove
  collection.schema.removeField("ntbalcrs")

  // remove
  collection.schema.removeField("ffohsms7")

  // remove
  collection.schema.removeField("jrvkmtz9")

  // remove
  collection.schema.removeField("5wxhymsc")

  // remove
  collection.schema.removeField("9apwkahb")

  // remove
  collection.schema.removeField("pmxqe8pq")

  // remove
  collection.schema.removeField("5qdsdhow")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ts3tmydt",
    "name": "estimated_circulation",
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
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic")

  collection.name = "orders_pre_calc"
  collection.options = {
    "query": "WITH circulation_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n)\n\n\n\nSELECT\n  o.id as id,\n  cc.estimated_circulation as estimated_circulation,\n  NULL as paper_equal,\n  (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n  NULL as cover_paper_outgo,\n  (block_printers.is_digital AND block_colors.is_color) as is_block_printer_color_digital,\n  NULL as is_cover_printer_color_digital,\n  (block_printers.is_digital AND NOT block_colors.is_color) as is_block_printer_bw_digital,\n  NULL as is_cover_printer_bw_digital,\n  (block_printers.is_risograph AND NOT block_colors.is_color) as is_block_printer_bw_risograph,\n  NULL as is_cover_printer_bw_risograph\nFROM orders o,\n     circulation_calc cc,\n     papers cover_papers,\n     colors block_colors,\n     printers block_printers\nWHERE o.id = cc.id\nAND   cover_papers.id = o.cover_paper\nAND   cover_papers.is_empty\nAND   block_colors.id = o.block_color\nAND   block_printers.id = o.block_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2y3c0ssk",
    "name": "estimated_circulation",
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
    "id": "jafdbg5o",
    "name": "paper_equal",
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
    "id": "6x6eeidn",
    "name": "block_paper_outgo",
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
    "id": "ntbalcrs",
    "name": "cover_paper_outgo",
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
    "id": "ffohsms7",
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
    "id": "jrvkmtz9",
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
    "id": "5wxhymsc",
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
    "id": "9apwkahb",
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
    "id": "pmxqe8pq",
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
    "id": "5qdsdhow",
    "name": "is_cover_printer_bw_risograph",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("ts3tmydt")

  return dao.saveCollection(collection)
})
