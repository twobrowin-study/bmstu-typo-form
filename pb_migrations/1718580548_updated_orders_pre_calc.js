/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic")

  collection.options = {
    "query": "WITH circulation_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n)\n\n\n\nSELECT\n  o.id as id,\n  cc.estimated_circulation as estimated_circulation,\n  NULL as paper_equal,\n  (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n  NULL as cover_paper_outgo,\n  (block_printers.is_digital AND block_colors.is_color) as is_block_printer_color_digital,\n  NULL as is_cover_printer_color_digital,\n  (block_printers.is_digital AND NOT block_colors.is_color) as is_block_printer_bw_digital,\n  NULL as is_cover_printer_bw_digital,\n  (block_printers.is_risograph AND NOT block_colors.is_color) as is_block_printer_bw_risograph,\n  NULL as is_cover_printer_bw_risograph\nFROM orders o,\n     circulation_calc cc,\n     papers cover_papers,\n     colors block_colors,\n     printers block_printers\nWHERE o.id = cc.id\nAND   cover_papers.id = o.cover_paper\nAND   cover_papers.is_empty\nAND   block_colors.id = o.block_color\nAND   block_printers.id = o.block_printer"
  }

  // remove
  collection.schema.removeField("cvuzoqge")

  // remove
  collection.schema.removeField("vuogkl7g")

  // remove
  collection.schema.removeField("54pccq2u")

  // remove
  collection.schema.removeField("r0choaj8")

  // remove
  collection.schema.removeField("nbgz8x3a")

  // remove
  collection.schema.removeField("elz7hsx2")

  // remove
  collection.schema.removeField("jtz7faph")

  // remove
  collection.schema.removeField("nasyf5ky")

  // remove
  collection.schema.removeField("lqtollm6")

  // remove
  collection.schema.removeField("cpvfukho")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0b7xjas5z191uic")

  collection.options = {
    "query": "WITH circulation_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\n    FROM orders o\n)\n\nSELECT\n  o.id as id,\n  cc.estimated_circulation as estimated_circulation,\n  (o.block_paper = o.cover_paper) as paper_equal,\n  (o.page_num*cc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n  cc.estimated_circulation/o.cover_multiplicity as cover_paper_outgo,\n  (block_printers.is_digital AND block_colors.is_color) as is_block_printer_color_digital,\n  (cover_printers.is_digital AND cover_colors.is_color) as is_cover_printer_color_digital,\n  (block_printers.is_digital AND NOT block_colors.is_color) as is_block_printer_bw_digital,\n  (cover_printers.is_digital AND NOT cover_colors.is_color) as is_cover_printer_bw_digital,\n  (block_printers.is_risograph AND NOT block_colors.is_color) as is_block_printer_bw_risograph,\n  (cover_printers.is_risograph AND NOT cover_colors.is_color) as is_cover_printer_bw_risograph\nFROM orders o,\n     circulation_calc cc,\n     colors block_colors,\n     colors cover_colors,\n     printers block_printers,\n     printers cover_printers\nWHERE o.id = cc.id\nAND   block_colors.id = o.block_color\nAND   cover_colors.id = o.cover_color\nAND   block_printers.id = o.block_printer\nAND   cover_printers.id = o.cover_printer"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvuzoqge",
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
    "id": "vuogkl7g",
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
    "id": "54pccq2u",
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
    "id": "r0choaj8",
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
    "id": "nbgz8x3a",
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
    "id": "elz7hsx2",
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
    "id": "jtz7faph",
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
    "id": "nasyf5ky",
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
    "id": "lqtollm6",
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
    "id": "cpvfukho",
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

  return dao.saveCollection(collection)
})
