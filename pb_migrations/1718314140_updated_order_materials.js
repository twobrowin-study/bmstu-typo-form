/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n")

  collection.options = {
    "query": "WITH estimated_circulation_calc as (\n  SELECT \n  o.id as id,\n  ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  ecc.estimated_circulation as estimated_circulation,\n  (o.page_num*ecc.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo\nFROM orders o, estimated_circulation_calc ecc\nWHERE o.id = ecc.id"
  }

  // remove
  collection.schema.removeField("lijuleon")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9lsgpdww",
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
    "id": "zbzvwn0k",
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
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n")

  collection.options = {
    "query": "SELECT \n  o.id as id,\n  ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lijuleon",
    "name": "estimated_circulation",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("9lsgpdww")

  // remove
  collection.schema.removeField("zbzvwn0k")

  return dao.saveCollection(collection)
})