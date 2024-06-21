/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n")

  collection.options = {
    "query": "WITH estimated_circulation_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT\n  o.id as id,\n  o.block_color as block_color\nFROM orders o, estimated_circulation_calc ecc\nWHERE o.id = ecc.id"
  }

  // remove
  collection.schema.removeField("abpsa7s6")

  // remove
  collection.schema.removeField("vpg7mmgt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j6ayvhzg",
    "name": "block_color",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "otyj355fus3kaxb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ol0o57xub0vdt5n")

  collection.options = {
    "query": "WITH estimated_circulation_calc as (\n  SELECT \n  o.id as id,\n  ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  ecc.estimated_circulation as estimated_circulation,\n  ceiling((o.page_num*ecc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo\nFROM orders o, estimated_circulation_calc ecc\nWHERE o.id = ecc.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "abpsa7s6",
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
    "id": "vpg7mmgt",
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
  collection.schema.removeField("j6ayvhzg")

  return dao.saveCollection(collection)
})
