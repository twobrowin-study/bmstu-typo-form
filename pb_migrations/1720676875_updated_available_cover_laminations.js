/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  concat(o.id, cl.id) as id,\n  o.id as order_id,\n  cl.id as cover_lamination_id,\n  cl.name as name,\n  cl.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     cover_laminations cl\n"
  }

  // remove
  collection.schema.removeField("13sluhwu")

  // remove
  collection.schema.removeField("stb4urxg")

  // remove
  collection.schema.removeField("repmpjl8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jxs2zld4",
    "name": "order_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wqjj2mpzk0zikk1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p6tthq2m",
    "name": "cover_lamination_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1wsvcmoq1q4l6w2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ppu80kvc",
    "name": "name",
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
    "id": "p5mdwdry",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "20dyz7sn",
    "name": "is_avaliable",
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
    "id": "ss7khscg",
    "name": "non_avaliable_message",
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
  const collection = dao.findCollectionByNameOrId("dc2mmgm2fo43fdc")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_color = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    c.is_cover_lamination_available as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для цветности ', c.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.id = o.cover_color\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "13sluhwu",
    "name": "order_id",
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
    "id": "stb4urxg",
    "name": "is_avaliable",
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
    "id": "repmpjl8",
    "name": "non_avaliable_message",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("jxs2zld4")

  // remove
  collection.schema.removeField("p6tthq2m")

  // remove
  collection.schema.removeField("ppu80kvc")

  // remove
  collection.schema.removeField("p5mdwdry")

  // remove
  collection.schema.removeField("20dyz7sn")

  // remove
  collection.schema.removeField("ss7khscg")

  return dao.saveCollection(collection)
})
