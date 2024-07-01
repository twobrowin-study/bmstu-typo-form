/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n      papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND p.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND p.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n)"
  }

  // remove
  collection.schema.removeField("cobxdfiz")

  // remove
  collection.schema.removeField("fslo5eiw")

  // remove
  collection.schema.removeField("xag64rtx")

  // remove
  collection.schema.removeField("yusxgood")

  // remove
  collection.schema.removeField("dudkt2tk")

  // remove
  collection.schema.removeField("t6v0vkqa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rz9b6rre",
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
    "id": "vsannp7h",
    "name": "paper_id",
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
    "id": "mgaa4z2g",
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
    "id": "o2oubfxs",
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
    "id": "waktrovc",
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
    "id": "tqa3h1rp",
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
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n      papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as format_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND p.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND p.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cobxdfiz",
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
    "id": "fslo5eiw",
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
    "id": "xag64rtx",
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
    "id": "yusxgood",
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
    "id": "dudkt2tk",
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
    "id": "t6v0vkqa",
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
  collection.schema.removeField("rz9b6rre")

  // remove
  collection.schema.removeField("vsannp7h")

  // remove
  collection.schema.removeField("mgaa4z2g")

  // remove
  collection.schema.removeField("o2oubfxs")

  // remove
  collection.schema.removeField("waktrovc")

  // remove
  collection.schema.removeField("tqa3h1rp")

  return dao.saveCollection(collection)
})
