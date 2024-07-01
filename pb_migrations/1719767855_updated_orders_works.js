/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8")

  collection.options = {
    "query": "WITH calc AS (\n  SELECT\n    o.id as id,\n    block_printers.is_digital as is_block_printer_digital,\n    block_printers.is_risograph as is_block_printer_risograph\n  FROM orders o,\n       printers block_printers\n  WHERE block_printers.id = o.block_printer\n)\nSELECT\n  op.id as id,\n  0.35+op.circulation*op.page_num*0.000005 as file_works,\n  (CASE\n    WHEN calc.is_block_printer_risograph THEN (oec.estimated_circulation*op.page_num/op.block_multiplicity)/5000 + (oec.estimated_circulation/op.block_multiplicity)*0.03333\n    ELSE NULL\n  END) as block_risograph_works,\n  (CASE\n    WHEN calc.is_block_printer_digital THEN (oec.estimated_circulation*op.page_num/(2*op.block_multiplicity))/2300 + (0.01*oec.estimated_circulation/(2*op.block_multiplicity))\n    ELSE NULL\n  END) as block_digital_works\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     calc\nWHERE op.id = oec.id AND op.id = calc.id"
  }

  // remove
  collection.schema.removeField("d81bszlk")

  // remove
  collection.schema.removeField("lwtryljs")

  // remove
  collection.schema.removeField("w9dmv7g8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npmxtcan",
    "name": "file_works",
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
    "id": "sq3dbspr",
    "name": "block_risograph_works",
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
    "id": "ybl6xzbx",
    "name": "block_digital_works",
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
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8")

  collection.options = {
    "query": "WITH calc AS (\n  SELECT\n    o.id as id,\n    block_printers.is_digital as is_block_printer_digital,\n    block_printers.is_risograph as is_block_printer_risograph\n  FROM orders o,\n       printers block_printers\n  WHERE block_printers.id = o.block_printer\n)\nSELECT\n  o.id as id,\n  0.35+o.circulation*o.page_num*0.000005 as file_works,\n  (CASE\n    WHEN calc.is_block_printer_risograph THEN (oec.estimated_circulation*o.page_num/o.block_multiplicity)/5000 + (oec.estimated_circulation/o.block_multiplicity)*0.03333\n    ELSE NULL\n  END) as block_risograph_works,\n  (CASE\n    WHEN calc.is_block_printer_digital THEN (oec.estimated_circulation*o.page_num/(2*o.block_multiplicity))/2300 + (0.01*oec.estimated_circulation/(2*o.block_multiplicity))\n    ELSE NULL\n  END) as block_digital_works\nFROM orders o,\n     orders_estimated_circulations oec,\n     calc\nWHERE o.id = oec.id AND o.id = calc.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d81bszlk",
    "name": "file_works",
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
    "id": "lwtryljs",
    "name": "block_risograph_works",
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
    "id": "w9dmv7g8",
    "name": "block_digital_works",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("npmxtcan")

  // remove
  collection.schema.removeField("sq3dbspr")

  // remove
  collection.schema.removeField("ybl6xzbx")

  return dao.saveCollection(collection)
})
