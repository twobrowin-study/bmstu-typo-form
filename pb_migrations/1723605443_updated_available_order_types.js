/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vfx2dt8zvqy8pbo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  order_type_id,\n  name,\n  \"order\",\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, ot.id) as id,\n    o.id as order_id,\n    ot.id as order_type_id,\n    ot.name as name,\n    ot.\"order\" as \"order\",\n    ot.is_active as is_available,\n    (CASE\n      WHEN NOT ot.is_active THEN \" - в разработке\"\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE o.format = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, ot.id) as id,\n    o.id as order_id,\n    ot.id as order_type_id,\n    ot.name as name,\n    ot.\"order\" as \"order\",\n    (CASE\n      WHEN NOT ot.is_active THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN NOT ot.is_active THEN \" - в разработке\"\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN \" - недоступно для формата А3\"\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f\n  WHERE f.id = o.format\n)\n"
  }

  // remove
  collection.schema.removeField("dero4eh4")

  // remove
  collection.schema.removeField("tbo2jcjx")

  // remove
  collection.schema.removeField("f9qqbabt")

  // remove
  collection.schema.removeField("fueljajb")

  // remove
  collection.schema.removeField("bc5aaew9")

  // remove
  collection.schema.removeField("2kmv3snw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzgobn5w",
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
    "id": "p89gwqyj",
    "name": "order_type_id",
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
    "id": "zlvpdtbu",
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
    "id": "hgqexxtc",
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
    "id": "q9dm5hhh",
    "name": "is_available",
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
    "id": "nxwehvqn",
    "name": "non_available_message",
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
  const collection = dao.findCollectionByNameOrId("vfx2dt8zvqy8pbo")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  order_type_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, ot.id) as id,\n    o.id as order_id,\n    ot.id as order_type_id,\n    ot.name as name,\n    ot.\"order\" as \"order\",\n    ot.is_active as is_avaliable,\n    (CASE\n      WHEN NOT ot.is_active THEN \" - в разработке\"\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE o.format = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, ot.id) as id,\n    o.id as order_id,\n    ot.id as order_type_id,\n    ot.name as name,\n    ot.\"order\" as \"order\",\n    (CASE\n      WHEN NOT ot.is_active THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN NOT ot.is_active THEN \" - в разработке\"\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN \" - недоступно для формата А3\"\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f\n  WHERE f.id = o.format\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dero4eh4",
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
    "id": "tbo2jcjx",
    "name": "order_type_id",
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
    "id": "f9qqbabt",
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
    "id": "fueljajb",
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
    "id": "bc5aaew9",
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
    "id": "2kmv3snw",
    "name": "non_available_message",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("tzgobn5w")

  // remove
  collection.schema.removeField("p89gwqyj")

  // remove
  collection.schema.removeField("zlvpdtbu")

  // remove
  collection.schema.removeField("hgqexxtc")

  // remove
  collection.schema.removeField("q9dm5hhh")

  // remove
  collection.schema.removeField("nxwehvqn")

  return dao.saveCollection(collection)
})
