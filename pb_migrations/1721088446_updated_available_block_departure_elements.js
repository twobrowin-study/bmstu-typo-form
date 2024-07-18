/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gwwts3f34x3bwun")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o\n  WHERE o.format = \"\" OR o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для принтера \", p.name, \" и формата \", f.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      printers p\n  WHERE f.id = o.format\n  AND   p.id = o.block_printer\n)"
  }

  // remove
  collection.schema.removeField("facpq9tp")

  // remove
  collection.schema.removeField("gcnyr3uv")

  // remove
  collection.schema.removeField("1mthgxuj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xto27e2n",
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
    "id": "nm5zygmk",
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
    "id": "tjzwz06n",
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
  const collection = dao.findCollectionByNameOrId("gwwts3f34x3bwun")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o\n  WHERE o.format = \"\"\n  AND   o.block_printer = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для принтера \", p.name, \" и формата \", f.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      printers p\n  WHERE f.id = o.format\n  AND   p.id = o.block_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "facpq9tp",
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
    "id": "gcnyr3uv",
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
    "id": "1mthgxuj",
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
  collection.schema.removeField("xto27e2n")

  // remove
  collection.schema.removeField("nm5zygmk")

  // remove
  collection.schema.removeField("tjzwz06n")

  return dao.saveCollection(collection)
})
