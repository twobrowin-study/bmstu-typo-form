/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("st9p85stn0zj7fj")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n      papers p\n  WHERE p.is_block_avaliable\n  AND   o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND p.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND p.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_block_avaliable\n  AND   pr.id = o.block_printer\n)"
  }

  // remove
  collection.schema.removeField("j6ynngx9")

  // remove
  collection.schema.removeField("pnn7bdj4")

  // remove
  collection.schema.removeField("d66qatty")

  // remove
  collection.schema.removeField("j1qfzmus")

  // remove
  collection.schema.removeField("xmp1oqxz")

  // remove
  collection.schema.removeField("ap1zkq0j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjeujobq",
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
    "id": "h3joqhw7",
    "name": "format_id",
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
    "id": "ixxw4cyd",
    "name": "name",
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
    "id": "lrtfxvx8",
    "name": "order",
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
    "id": "cypb2x25",
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
    "id": "fop2gcfb",
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
  const collection = dao.findCollectionByNameOrId("st9p85stn0zj7fj")

  collection.options = {
    "query": "SELECT\n  concat(o.id, p.id) as id,\n  o.id as order_id,\n  p.id as format_id,\n  p.name as name,\n  p.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     papers p\nWHERE p.is_block_avaliable\nAND   o.block_printer = \"\""
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j6ynngx9",
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
    "id": "pnn7bdj4",
    "name": "format_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "gq0cdj9ta2cbq35",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d66qatty",
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
    "id": "j1qfzmus",
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
    "id": "xmp1oqxz",
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
    "id": "ap1zkq0j",
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
  collection.schema.removeField("fjeujobq")

  // remove
  collection.schema.removeField("h3joqhw7")

  // remove
  collection.schema.removeField("ixxw4cyd")

  // remove
  collection.schema.removeField("lrtfxvx8")

  // remove
  collection.schema.removeField("cypb2x25")

  // remove
  collection.schema.removeField("fop2gcfb")

  return dao.saveCollection(collection)
})
