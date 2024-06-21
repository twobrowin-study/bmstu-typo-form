/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.name = "orders_counted_view"
  collection.options = {
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  f.name as format,\n  o.page_num as page_num,\n  pc.estimated_circulation as estimated_circulation,\n  ceiling((o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo\nFROM orders o, pre_calc pc, formats f\nWHERE o.id = pc.id\nAND   f.id = o.format"
  }

  // remove
  collection.schema.removeField("xkz3muhi")

  // remove
  collection.schema.removeField("j4l2dj4m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "amlq57jg",
    "name": "title",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "htlkvgen",
    "name": "ext_order_num",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s5ehm12g",
    "name": "circulation",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fv0gk8iy",
    "name": "format",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "poctv4ml",
    "name": "page_num",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwoivmjv",
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
    "id": "ihdhwdtz",
    "name": "block_paper_outgo",
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
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.name = "orders_count_view"
  collection.options = {
    "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  pc.estimated_circulation as estimated_circulation,\n  ceiling((o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo\nFROM orders o, pre_calc pc\nWHERE o.id = pc.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xkz3muhi",
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
    "id": "j4l2dj4m",
    "name": "block_paper_outgo",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("amlq57jg")

  // remove
  collection.schema.removeField("htlkvgen")

  // remove
  collection.schema.removeField("s5ehm12g")

  // remove
  collection.schema.removeField("fv0gk8iy")

  // remove
  collection.schema.removeField("poctv4ml")

  // remove
  collection.schema.removeField("xwoivmjv")

  // remove
  collection.schema.removeField("ihdhwdtz")

  return dao.saveCollection(collection)
})
