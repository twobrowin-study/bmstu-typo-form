/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("st9p85stn0zj7fj")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_avaliable_message\n  FROM orders o,\n      papers p\n  WHERE p.is_block_avaliable\n  AND   o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_block_avaliable\n  AND   pr.id = o.block_printer\n)"
  }

  // remove
  collection.schema.removeField("yw6kdn44")

  // remove
  collection.schema.removeField("qfkiqhr3")

  // remove
  collection.schema.removeField("88i3h7z1")

  // remove
  collection.schema.removeField("fahh1gdw")

  // remove
  collection.schema.removeField("n6jer0kd")

  // remove
  collection.schema.removeField("i0ermvmf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hyrwstih",
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
    "id": "hv1e7ldl",
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
    "id": "0v6vqdjo",
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
    "id": "jukh6sl3",
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
    "id": "exmcgfqk",
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
    "id": "u7wgp1rb",
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
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n      papers p\n  WHERE p.is_block_avaliable\n  AND   o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND p.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND p.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      papers p,\n      printers pr\n  WHERE p.is_block_avaliable\n  AND   pr.id = o.block_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yw6kdn44",
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
    "id": "qfkiqhr3",
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
    "id": "88i3h7z1",
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
    "id": "fahh1gdw",
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
    "id": "n6jer0kd",
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
    "id": "i0ermvmf",
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
  collection.schema.removeField("hyrwstih")

  // remove
  collection.schema.removeField("hv1e7ldl")

  // remove
  collection.schema.removeField("0v6vqdjo")

  // remove
  collection.schema.removeField("jukh6sl3")

  // remove
  collection.schema.removeField("exmcgfqk")

  // remove
  collection.schema.removeField("u7wgp1rb")

  return dao.saveCollection(collection)
})
