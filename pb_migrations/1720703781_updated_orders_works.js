/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8")

  collection.options = {
    "query": "SELECT id from orders"
  }

  // remove
  collection.schema.removeField("mgqmnyez")

  // remove
  collection.schema.removeField("6h3lt5ip")

  // remove
  collection.schema.removeField("hhukango")

  // remove
  collection.schema.removeField("r7bozmtz")

  // remove
  collection.schema.removeField("bcvplwmz")

  // remove
  collection.schema.removeField("pvzjrvqe")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8")

  collection.options = {
    "query": "WITH calc AS (\n  SELECT\n    o.id as id,\n    block_printers.is_digital as is_block_printer_digital,\n    block_printers.is_risograph as is_block_printer_risograph\n  FROM orders o,\n       printers block_printers\n  WHERE block_printers.id = o.block_printer\n)\nSELECT\n  op.id as id,\n  round(0.35+op.circulation*op.page_num*0.000005,2) as file_works,\n  (CASE\n    WHEN calc.is_block_printer_risograph THEN round((oec.estimated_circulation*op.page_num/op.block_multiplicity)/5000 + (oec.estimated_circulation/op.block_multiplicity)*0.03333,2)\n    ELSE NULL\n  END) as block_risograph_works,\n  (CASE\n    WHEN calc.is_block_printer_digital THEN round((oec.estimated_circulation*op.page_num/(2*op.block_multiplicity))/2300 + (0.01*oec.estimated_circulation/(2*op.block_multiplicity)),2)\n    ELSE NULL\n  END) as block_digital_works,\n  round(0.1+ceiling(((oec.estimated_circulation*p.thickness/op.block_multiplicity)/100))*0.02*3, 2) as cutting_work,\n  round(0.1+0.05*ceiling((oec.estimated_circulation*p.thickness/op.block_multiplicity)/500), 2) as transport_work,\n  round(0.1+0.03333*ceiling((oec.estimated_circulation*p.thickness/op.block_multiplicity)/200), 2) as package_work\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     calc,\n     orders o,\n     papers p\nWHERE op.id = oec.id AND op.id = calc.id\nAND   op.id = o.id AND p.id = o.cover_paper"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgqmnyez",
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
    "id": "6h3lt5ip",
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
    "id": "hhukango",
    "name": "block_digital_works",
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
    "id": "r7bozmtz",
    "name": "cutting_work",
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
    "id": "bcvplwmz",
    "name": "transport_work",
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
    "id": "pvzjrvqe",
    "name": "package_work",
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
