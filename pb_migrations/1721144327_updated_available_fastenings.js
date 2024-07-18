/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   (o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN concat(\" - недоступно принтера \", cp.name, \" и формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm,\n       printers cp\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   o.format = fm.id\n  AND   cp.id = o.cover_printer\n)"
  }

  // remove
  collection.schema.removeField("ft6q5vrh")

  // remove
  collection.schema.removeField("shoxzmbb")

  // remove
  collection.schema.removeField("hqda8ruk")

  // remove
  collection.schema.removeField("wpwkgxqi")

  // remove
  collection.schema.removeField("npvbhdxz")

  // remove
  collection.schema.removeField("vqhtffm1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vpq0gr5x",
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
    "id": "qs98htle",
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
    "id": "tembte9z",
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
    "id": "h7neyo8t",
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
    "id": "o8atc7mx",
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
    "id": "85zwrrxg",
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
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   (o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   (o.format = \"\" OR o.cover_printer = \"\")\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN cp.is_risograph AND fm.name = \"А4\" AND NOT f.is_brace THEN concat(\" - недоступно принтера \", cp.name, \" и формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm,\n       printers cp\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace\n  AND   o.format = fm.id\n  AND   cp.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ft6q5vrh",
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
    "id": "shoxzmbb",
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
    "id": "hqda8ruk",
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
    "id": "wpwkgxqi",
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
    "id": "npvbhdxz",
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
    "id": "vqhtffm1",
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
  collection.schema.removeField("vpq0gr5x")

  // remove
  collection.schema.removeField("qs98htle")

  // remove
  collection.schema.removeField("tembte9z")

  // remove
  collection.schema.removeField("h7neyo8t")

  // remove
  collection.schema.removeField("o8atc7mx")

  // remove
  collection.schema.removeField("85zwrrxg")

  return dao.saveCollection(collection)
})
