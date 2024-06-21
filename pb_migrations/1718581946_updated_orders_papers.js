/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7k8x1s60alse4sy")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  (o.block_paper = o.cover_paper) as paper_equal,\n  concat(block_papers.name, ' ', o.block_format) as block_paper_name,\n  (o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as cover_paper_name,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN oec.estimated_circulation/o.cover_multiplicity\n    ELSE NULL\n  END) as cover_paper_outgo\nFROM orders o,\n    orders_estimated_circulations oec,\n    papers block_papers,\n    papers cover_papers\nWHERE o.id = oec.id\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper"
  }

  // remove
  collection.schema.removeField("ouuwttzh")

  // remove
  collection.schema.removeField("b2la2wzc")

  // remove
  collection.schema.removeField("8wbatmfh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "77xiv2wl",
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
    "id": "jgtp4pra",
    "name": "block_paper_name",
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
    "id": "xbnu53o5",
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
    "id": "qpc5vvbk",
    "name": "cover_paper_name",
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
    "id": "a9shmcbf",
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
    "query": "SELECT\n  o.id as id,\n  (o.block_paper = o.cover_paper) as paper_equal,\n  (o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN oec.estimated_circulation/o.cover_multiplicity\n    ELSE NULL\n  END) as cover_paper_outgo\nFROM orders o,\n    orders_estimated_circulations oec,\n    papers cover_papers\nWHERE o.id = oec.id\nAND cover_papers.id = o.cover_paper"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ouuwttzh",
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
    "id": "b2la2wzc",
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
    "id": "8wbatmfh",
    "name": "cover_paper_outgo",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("77xiv2wl")

  // remove
  collection.schema.removeField("jgtp4pra")

  // remove
  collection.schema.removeField("xbnu53o5")

  // remove
  collection.schema.removeField("qpc5vvbk")

  // remove
  collection.schema.removeField("a9shmcbf")

  return dao.saveCollection(collection)
})
