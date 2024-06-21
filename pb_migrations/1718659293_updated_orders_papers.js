/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7k8x1s60alse4sy")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  (CASE\n   WHEN NOT cover_papers.is_empty THEN o.block_paper = o.cover_paper\n   ELSE NULL\n  END) as paper_equal,\n  concat(block_papers.name, ' ', o.block_format) as block_paper_name,\n  ceiling((o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as cover_paper_name,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN ceiling(oec.estimated_circulation/o.cover_multiplicity)\n    ELSE NULL\n  END) as cover_paper_outgo\nFROM orders o,\n    orders_estimated_circulations oec,\n    papers block_papers,\n    papers cover_papers\nWHERE o.id = oec.id\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper"
  }

  // remove
  collection.schema.removeField("co47htqt")

  // remove
  collection.schema.removeField("epuqrwti")

  // remove
  collection.schema.removeField("musjppmp")

  // remove
  collection.schema.removeField("b8cjh7iu")

  // remove
  collection.schema.removeField("pxqjhxcn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rffidnmd",
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
    "id": "j3ysahqw",
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
    "id": "zokurknh",
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
    "id": "6mxt7jch",
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
    "id": "hnfzzy7a",
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
    "query": "SELECT\n  o.id as id,\n  (CASE\n   WHEN NOT cover_papers.is_empty THEN o.block_paper = o.cover_paper\n   ELSE NULL\n  END) as paper_equal,\n  concat(block_papers.name, ' ', o.block_format) as block_paper_name,\n  (o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity) as block_paper_outgo,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as cover_paper_name,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN oec.estimated_circulation/o.cover_multiplicity\n    ELSE NULL\n  END) as cover_paper_outgo\nFROM orders o,\n    orders_estimated_circulations oec,\n    papers block_papers,\n    papers cover_papers\nWHERE o.id = oec.id\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "co47htqt",
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
    "id": "epuqrwti",
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
    "id": "musjppmp",
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
    "id": "b8cjh7iu",
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
    "id": "pxqjhxcn",
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
  collection.schema.removeField("rffidnmd")

  // remove
  collection.schema.removeField("j3ysahqw")

  // remove
  collection.schema.removeField("zokurknh")

  // remove
  collection.schema.removeField("6mxt7jch")

  // remove
  collection.schema.removeField("hnfzzy7a")

  return dao.saveCollection(collection)
})
