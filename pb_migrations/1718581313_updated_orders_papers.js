/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7k8x1s60alse4sy")

  collection.options = {
    "query": "SELECT\n    o.id as id,\n    (o.block_paper = o.cover_paper) as paper_equal,\n    (o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    oec.estimated_circulation/o.cover_multiplicity as cover_paper_outgo\nFROM orders o,\n    orders_estimated_circulations oec\nWHERE o.id = oec.id"
  }

  // remove
  collection.schema.removeField("6nufkeyg")

  // remove
  collection.schema.removeField("dqzyxyne")

  // remove
  collection.schema.removeField("fdgx7v1d")

  // remove
  collection.schema.removeField("7kbw0cc3")

  // remove
  collection.schema.removeField("oxfsgefu")

  // remove
  collection.schema.removeField("6c5dta8s")

  // remove
  collection.schema.removeField("jtmvmgeu")

  // remove
  collection.schema.removeField("r28ryhel")

  // remove
  collection.schema.removeField("hqmw9nz5")

  // remove
  collection.schema.removeField("tljlvii0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "in4vbqwa",
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
    "id": "wfjmfdcg",
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
    "id": "pkhhp2yt",
    "name": "cover_paper_outgo",
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
  const collection = dao.findCollectionByNameOrId("7k8x1s60alse4sy")

  collection.options = {
    "query": "SELECT id,\n       estimated_circulation,\n       paper_equal,\n       block_paper_outgo,\n       cover_paper_outgo,\n       is_block_printer_color_digital,\n       is_cover_printer_color_digital,\n       is_block_printer_bw_digital,\n       is_cover_printer_bw_digital,\n       is_block_printer_bw_risograph,\n       is_cover_printer_bw_risograph\nFROM (\n  SELECT\n    o.id as id,\n    oec.estimated_circulation as estimated_circulation,\n    (o.block_paper = o.cover_paper) as paper_equal,\n    (o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    oec.estimated_circulation/o.cover_multiplicity as cover_paper_outgo,\n    (block_printers.is_digital AND block_colors.is_color) as is_block_printer_color_digital,\n    (cover_printers.is_digital AND cover_colors.is_color) as is_cover_printer_color_digital,\n    (block_printers.is_digital AND NOT block_colors.is_color) as is_block_printer_bw_digital,\n    (cover_printers.is_digital AND NOT cover_colors.is_color) as is_cover_printer_bw_digital,\n    (block_printers.is_risograph AND NOT block_colors.is_color) as is_block_printer_bw_risograph,\n    (cover_printers.is_risograph AND NOT cover_colors.is_color) as is_cover_printer_bw_risograph\n  FROM orders o,\n      orders_estimated_circulations oec,\n      colors block_colors,\n      colors cover_colors,\n      printers block_printers,\n      printers cover_printers\n  WHERE o.id = oec.id\n  AND   block_colors.id = o.block_color\n  AND   cover_colors.id = o.cover_color\n  AND   block_printers.id = o.block_printer\n  AND   cover_printers.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    o.id as id,\n    oec.estimated_circulation as estimated_circulation,\n    NULL as paper_equal,\n    (o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n    NULL as cover_paper_outgo,\n    (block_printers.is_digital AND block_colors.is_color) as is_block_printer_color_digital,\n    NULL as is_cover_printer_color_digital,\n    (block_printers.is_digital AND NOT block_colors.is_color) as is_block_printer_bw_digital,\n    NULL as is_cover_printer_bw_digital,\n    (block_printers.is_risograph AND NOT block_colors.is_color) as is_block_printer_bw_risograph,\n    NULL as is_cover_printer_bw_risograph\n  FROM orders o,\n      orders_estimated_circulations oec,\n      papers cover_papers,\n      colors block_colors,\n      printers block_printers\n  WHERE o.id = oec.id\n  AND   cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n  AND   block_colors.id = o.block_color\n  AND   block_printers.id = o.block_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6nufkeyg",
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
    "id": "dqzyxyne",
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
    "id": "fdgx7v1d",
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
    "id": "7kbw0cc3",
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
    "id": "oxfsgefu",
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
    "id": "6c5dta8s",
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
    "id": "jtmvmgeu",
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
    "id": "r28ryhel",
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
    "id": "hqmw9nz5",
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
    "id": "tljlvii0",
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
  collection.schema.removeField("in4vbqwa")

  // remove
  collection.schema.removeField("wfjmfdcg")

  // remove
  collection.schema.removeField("pkhhp2yt")

  return dao.saveCollection(collection)
})
