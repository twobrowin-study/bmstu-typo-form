/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберите вид изделия\" as non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   (o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN concat(\" - недоступно принтера \", cp.name, \" и формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm,\n       printers cp\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   o.format = fm.id\n  AND   cp.id = o.cover_printer\n)"
  }

  // remove
  collection.schema.removeField("0ortmysi")

  // remove
  collection.schema.removeField("9a2yfzzx")

  // remove
  collection.schema.removeField("8xv2yv23")

  // remove
  collection.schema.removeField("sxnk4f2n")

  // remove
  collection.schema.removeField("ozi8oh3w")

  // remove
  collection.schema.removeField("og1ftzfu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yrk1wc2b",
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
    "id": "alvpskn4",
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
    "id": "t76d8wbh",
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
    "id": "yo9sjiut",
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
    "id": "bmzqfvsx",
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
    "id": "b947bx3y",
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
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберите тип печати\" as non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   (o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN concat(\" - недоступно принтера \", cp.name, \" и формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm,\n       printers cp\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   o.format = fm.id\n  AND   cp.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0ortmysi",
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
    "id": "9a2yfzzx",
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
    "id": "8xv2yv23",
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
    "id": "sxnk4f2n",
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
    "id": "ozi8oh3w",
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
    "id": "og1ftzfu",
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
  collection.schema.removeField("yrk1wc2b")

  // remove
  collection.schema.removeField("alvpskn4")

  // remove
  collection.schema.removeField("t76d8wbh")

  // remove
  collection.schema.removeField("yo9sjiut")

  // remove
  collection.schema.removeField("bmzqfvsx")

  // remove
  collection.schema.removeField("b947bx3y")

  return dao.saveCollection(collection)
})
