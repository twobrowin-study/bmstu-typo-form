/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message,\n    FALSE as full_is_avaliable,\n    \" - выберете тип печати\" as full_non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message,\n    ot.has_fastening as full_is_avaliable,\n    (CASE\n      WHEN NOT ot.has_fastening THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE \"\"\n    END) as full_non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   (NOT f.is_brace OR o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message,\n    ot.has_fastening as full_is_avaliable,\n    (CASE\n      WHEN NOT ot.has_fastening THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE \"\"\n    END) as full_non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n)"
  }

  // remove
  collection.schema.removeField("cfxtvalr")

  // remove
  collection.schema.removeField("vime95m9")

  // remove
  collection.schema.removeField("htd8hq6q")

  // remove
  collection.schema.removeField("ra3qto2y")

  // remove
  collection.schema.removeField("ezxpvewx")

  // remove
  collection.schema.removeField("j0iynhl7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sryqlsuy",
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
    "id": "o4r7r7mv",
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
    "id": "skmqtxbv",
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
    "id": "q2ee68oo",
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
    "id": "yj2lablc",
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
    "id": "wn9jxd4s",
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
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_available_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    ot.has_fastening or f.is_empty as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_fastening AND NOT f.is_empty THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   (NOT f.is_brace OR o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN NOT ot.has_fastening AND NOT f.is_empty THEN FALSE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_fastening AND NOT f.is_empty THEN concat(\" - недоступно для типа печати \", ot.name)\n      WHEN o.page_num > fm.brace_max_pages THEN concat(\" - количество страниц превышает \", fm.brace_max_pages, \" для формата \", fm.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cfxtvalr",
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
    "id": "vime95m9",
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
    "id": "htd8hq6q",
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
    "id": "ra3qto2y",
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
    "id": "ezxpvewx",
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
    "id": "j0iynhl7",
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
  collection.schema.removeField("sryqlsuy")

  // remove
  collection.schema.removeField("o4r7r7mv")

  // remove
  collection.schema.removeField("skmqtxbv")

  // remove
  collection.schema.removeField("q2ee68oo")

  // remove
  collection.schema.removeField("yj2lablc")

  // remove
  collection.schema.removeField("wn9jxd4s")

  return dao.saveCollection(collection)
})
