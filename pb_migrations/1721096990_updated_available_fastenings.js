/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   (o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   (o.format = \"\" OR o.cover_printer = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN concat(\" - недоступно принтера \", cp.name, \" и формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm,\n       printers cp\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   o.format = fm.id\n  AND   cp.id = o.cover_printer\n)"
  }

  // remove
  collection.schema.removeField("e6qqaxxz")

  // remove
  collection.schema.removeField("f8tiw0c3")

  // remove
  collection.schema.removeField("jzjoguts")

  // remove
  collection.schema.removeField("nwiq2omo")

  // remove
  collection.schema.removeField("xycjeddo")

  // remove
  collection.schema.removeField("qeev7aar")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hcifd4za",
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
    "id": "mleicopx",
    "name": "fastening_id",
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
    "id": "ziuvcgiq",
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
    "id": "oywqklb4",
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
    "id": "3rjrqlsz",
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
    "id": "i9dwykgx",
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
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   (NOT f.is_brace OR o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN concat(\" - недоступно принтера \", cp.name, \" и формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm,\n       printers cp\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n  AND   cp.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e6qqaxxz",
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
    "id": "f8tiw0c3",
    "name": "fastening_id",
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
    "id": "jzjoguts",
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
    "id": "nwiq2omo",
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
    "id": "xycjeddo",
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
    "id": "qeev7aar",
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
  collection.schema.removeField("hcifd4za")

  // remove
  collection.schema.removeField("mleicopx")

  // remove
  collection.schema.removeField("ziuvcgiq")

  // remove
  collection.schema.removeField("oywqklb4")

  // remove
  collection.schema.removeField("3rjrqlsz")

  // remove
  collection.schema.removeField("i9dwykgx")

  return dao.saveCollection(collection)
})
