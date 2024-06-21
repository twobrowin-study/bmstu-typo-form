/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq")

  collection.options = {
    "query": "SELECT \n  o.id as id,\n  op.block_paper_outgo as paper_outgo_1_name,\n  (CASE\n    WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n    ELSE op.block_paper_outgo\n  END) as paper_outgo_1_value,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_name\n    ELSE NULL\n  END) as paper_outgo_2_name,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n    ELSE NULL\n  END) as paper_outgo_2_value\nFROM orders o,\n     orders_estimated_circulations oec,\n     orders_papers op,\n     orders_colors oc,\n     formats,\n     fastenings\nWHERE o.id = oec.id AND o.id = op.id AND o.id = oc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening"
  }

  // remove
  collection.schema.removeField("lv2rcivj")

  // remove
  collection.schema.removeField("zbvo6ppl")

  // remove
  collection.schema.removeField("mslqt2wm")

  // remove
  collection.schema.removeField("tae81wym")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n1vngw4t",
    "name": "paper_outgo_1_name",
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
    "id": "15ankc6h",
    "name": "paper_outgo_1_value",
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
    "id": "4wyurox3",
    "name": "paper_outgo_2_name",
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
    "id": "3uuchaun",
    "name": "paper_outgo_2_value",
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

  collection.options = {
    "query": "SELECT \n  o.id as id,\n  op.block_paper_outgo as paper_outgo_1_name,\n  (CASE\n    WHEN op.paper_equal THEN op.block_paper_outgo + op.cover_paper_outgo\n    ELSE op.block_paper_outgo\n  END) as paper_outgo_1_value,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_name\n    ELSE NULL\n  END) as paper_outgo_2_name,\n  (CASE\n    WHEN NOT op.paper_equal THEN op.cover_paper_outgo\n    ELSE NULL\n  END) as paper_outgo_2_value\nFROM orders o,\n     orders_estimated_circulations oec,\n     orders_papers op,\n     orders_colors oc,\n     formats,\n     fastenings\nWHERE o.id = oec.id = op.id = oc.id\nAND   formats.id = o.format\nAND   fastenings.id = o.fastening"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lv2rcivj",
    "name": "paper_outgo_1_name",
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
    "id": "zbvo6ppl",
    "name": "paper_outgo_1_value",
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
    "id": "mslqt2wm",
    "name": "paper_outgo_2_name",
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
    "id": "tae81wym",
    "name": "paper_outgo_2_value",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("n1vngw4t")

  // remove
  collection.schema.removeField("15ankc6h")

  // remove
  collection.schema.removeField("4wyurox3")

  // remove
  collection.schema.removeField("3uuchaun")

  return dao.saveCollection(collection)
})
