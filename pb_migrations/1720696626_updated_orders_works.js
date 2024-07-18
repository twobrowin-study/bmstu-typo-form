/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8")

  collection.options = {
    "query": "WITH calc AS (\n  SELECT\n    o.id as id,\n    block_printers.is_digital as is_block_printer_digital,\n    block_printers.is_risograph as is_block_printer_risograph\n  FROM orders o,\n       printers block_printers\n  WHERE block_printers.id = o.block_printer\n)\nSELECT\n  op.id as id,\n  round(0.35+op.circulation*op.page_num*0.000005,2) as file_works,\n  (CASE\n    WHEN calc.is_block_printer_risograph THEN round((oec.estimated_circulation*op.page_num/op.block_multiplicity)/5000 + (oec.estimated_circulation/op.block_multiplicity)*0.03333,2)\n    ELSE NULL\n  END) as block_risograph_works,\n  (CASE\n    WHEN calc.is_block_printer_digital THEN round((oec.estimated_circulation*op.page_num/(2*op.block_multiplicity))/2300 + (0.01*oec.estimated_circulation/(2*op.block_multiplicity)),2)\n    ELSE NULL\n  END) as block_digital_works,\n  (CASE\n    WHEN op.cover_lamination != \"\" THEN round(0.1+0.25+(oec.estimated_circulation/(op.cover_multiplicity*600)),2)\n    ELSE NULL\n  END) as cover_laminaion_works,\n  round(0.1+ceiling(((oec.estimated_circulation*p.thickness/op.block_multiplicity)/100))*0.02*3, 2) as cutting_work,\n  round(0.1+0.05*ceiling((oec.estimated_circulation*p.thickness/op.block_multiplicity)/500), 2) as transport_work,\n  round(0.1+0.03333*ceiling((oec.estimated_circulation*p.thickness/op.block_multiplicity)/200), 2) as package_work\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     calc,\n     orders o,\n     papers p\nWHERE op.id = oec.id AND op.id = calc.id\nAND   op.id = o.id AND p.id = o.cover_paper"
  }

  // remove
  collection.schema.removeField("39hmmrwx")

  // remove
  collection.schema.removeField("mnbuxov3")

  // remove
  collection.schema.removeField("yiznztye")

  // remove
  collection.schema.removeField("shwee72n")

  // remove
  collection.schema.removeField("56gts6jy")

  // remove
  collection.schema.removeField("3iz1tqna")

  // remove
  collection.schema.removeField("m9cvjsss")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q83pdtv4",
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
    "id": "1jtzrirz",
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
    "id": "ld9gpurg",
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
    "id": "o8rgexfc",
    "name": "cover_laminaion_works",
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
    "id": "x4vsls0f",
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
    "id": "ajlksmpv",
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
    "id": "6vpcwp40",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8")

  collection.options = {
    "query": "WITH calc AS (\n  SELECT\n    o.id as id,\n    block_printers.is_digital as is_block_printer_digital,\n    block_printers.is_risograph as is_block_printer_risograph\n  FROM orders o,\n       printers block_printers\n  WHERE block_printers.id = o.block_printer\n)\nSELECT\n  op.id as id,\n  round(0.35+op.circulation*op.page_num*0.000005,2) as file_works,\n  (CASE\n    WHEN calc.is_block_printer_risograph THEN round((oec.estimated_circulation*op.page_num/op.block_multiplicity)/5000 + (oec.estimated_circulation/op.block_multiplicity)*0.03333,2)\n    ELSE NULL\n  END) as block_risograph_works,\n  (CASE\n    WHEN calc.is_block_printer_digital THEN round((oec.estimated_circulation*op.page_num/(2*op.block_multiplicity))/2300 + (0.01*oec.estimated_circulation/(2*op.block_multiplicity)),2)\n    ELSE NULL\n  END) as block_digital_works,\n  (CASE\n    WHEN op.cover_lamination THEN round(0.1+0.25+(oec.estimated_circulation/(op.cover_multiplicity*600)),2)\n    ELSE NULL\n  END) as cover_laminaion_works,\n  round(0.1+ceiling(((oec.estimated_circulation*p.thickness/op.block_multiplicity)/100))*0.02*3, 2) as cutting_work,\n  round(0.1+0.05*ceiling((oec.estimated_circulation*p.thickness/op.block_multiplicity)/500), 2) as transport_work,\n  round(0.1+0.03333*ceiling((oec.estimated_circulation*p.thickness/op.block_multiplicity)/200), 2) as package_work\nFROM orders_processed op,\n     orders_estimated_circulations oec,\n     calc,\n     orders o,\n     papers p\nWHERE op.id = oec.id AND op.id = calc.id\nAND   op.id = o.id AND p.id = o.cover_paper"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "39hmmrwx",
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
    "id": "mnbuxov3",
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
    "id": "yiznztye",
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
    "id": "shwee72n",
    "name": "cover_laminaion_works",
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
    "id": "56gts6jy",
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
    "id": "3iz1tqna",
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
    "id": "m9cvjsss",
    "name": "package_work",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("q83pdtv4")

  // remove
  collection.schema.removeField("1jtzrirz")

  // remove
  collection.schema.removeField("ld9gpurg")

  // remove
  collection.schema.removeField("o8rgexfc")

  // remove
  collection.schema.removeField("x4vsls0f")

  // remove
  collection.schema.removeField("ajlksmpv")

  // remove
  collection.schema.removeField("6vpcwp40")

  return dao.saveCollection(collection)
})
