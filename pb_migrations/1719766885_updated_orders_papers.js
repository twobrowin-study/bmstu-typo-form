/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7k8x1s60alse4sy")

  collection.options = {
    "query": "SELECT\n  op.id as id,\n  (CASE\n   WHEN NOT op.is_cover_paper_empty THEN op.block_paper = op.cover_paper\n   ELSE NULL\n  END) as paper_equal,\n  concat(op.block_paper, ' ', op.block_format) as block_paper_name,\n  ceiling((op.page_num*oec.estimated_circulation)/(2*op.block_multiplicity)) as block_paper_outgo,\n  (CASE\n    WHEN NOT op.is_cover_paper_empty THEN concat(op.cover_paper, ' ', op.cover_format)\n    ELSE NULL\n  END) as cover_paper_name,\n  (CASE\n    WHEN NOT op.is_cover_paper_empty THEN ceiling(oec.estimated_circulation/op.cover_multiplicity)\n    ELSE NULL\n  END) as cover_paper_outgo\nFROM orders_processed op,\n     orders_estimated_circulations oec\nWHERE op.id = oec.id"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ycm2iydh",
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
    "id": "ugd1q8tz",
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
    "id": "e7vv0s1x",
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
    "id": "fvaqew8d",
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
    "id": "v4r6jlcw",
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
    "query": "SELECT\n  o.id as id,\n  (CASE\n   WHEN NOT cover_papers.is_empty THEN o.block_paper = o.cover_paper\n   ELSE NULL\n  END) as paper_equal,\n  concat(block_papers.name, ' ', o.block_format) as block_paper_name,\n  ceiling((o.page_num*oec.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN concat(cover_papers.name, ' ', o.cover_format)\n    ELSE NULL\n  END) as cover_paper_name,\n  (CASE\n    WHEN NOT cover_papers.is_empty THEN ceiling(oec.estimated_circulation/o.cover_multiplicity)\n    ELSE NULL\n  END) as cover_paper_outgo\nFROM orders o,\n    orders_estimated_circulations oec,\n    papers block_papers,\n    papers cover_papers\nWHERE o.id = oec.id\nAND   block_papers.id = o.block_paper\nAND   cover_papers.id = o.cover_paper"
  }

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

  // remove
  collection.schema.removeField("ycm2iydh")

  // remove
  collection.schema.removeField("ugd1q8tz")

  // remove
  collection.schema.removeField("e7vv0s1x")

  // remove
  collection.schema.removeField("fvaqew8d")

  // remove
  collection.schema.removeField("v4r6jlcw")

  return dao.saveCollection(collection)
})
