/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fpp5sd24bya0kh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(\" - недоступно для принтера \", p.name, \" и формата \", f.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       printers p\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   p.id = o.cover_printer\n)"
  }

  // remove
  collection.schema.removeField("3psnkcli")

  // remove
  collection.schema.removeField("sci48vge")

  // remove
  collection.schema.removeField("9lfctrf6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l5f8fvhn",
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
    "id": "ph4jids5",
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
    "id": "ybfchmoe",
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
  const collection = dao.findCollectionByNameOrId("0fpp5sd24bya0kh")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.type\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(\" - недоступно для принтера \", p.name, \" и формата \", f.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       printers p\n  WHERE ot.id = o.type\n  AND   f.id = o.format\n  AND   p.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3psnkcli",
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
    "id": "sci48vge",
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
    "id": "9lfctrf6",
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
  collection.schema.removeField("l5f8fvhn")

  // remove
  collection.schema.removeField("ph4jids5")

  // remove
  collection.schema.removeField("ybfchmoe")

  return dao.saveCollection(collection)
})
