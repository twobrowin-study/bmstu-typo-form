/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0c7j6bdk44jd5u")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n      formats f\n  WHERE (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fa\n  WHERE o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет')\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      printers bp\n  WHERE (o.fastening = \"\" OR o.page_num = 0)\n  AND   bp.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет')\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      printers bp,\n      fastenings fa\n  WHERE o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   bp.id = o.block_printer\n)"
  }

  // remove
  collection.schema.removeField("xrylweiy")

  // remove
  collection.schema.removeField("bmrz0adh")

  // remove
  collection.schema.removeField("lwrlwuqc")

  // remove
  collection.schema.removeField("saduxrio")

  // remove
  collection.schema.removeField("tmhib4ma")

  // remove
  collection.schema.removeField("vkift20i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7dyljimf",
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
    "id": "6rswffld",
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
    "id": "0v0lel65",
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
    "id": "qlu9edcy",
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
    "id": "cq0ztmao",
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
    "id": "wwh2xzxk",
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
  const collection = dao.findCollectionByNameOrId("g0c7j6bdk44jd5u")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fa\n  WHERE o.fastening = fa.id\n  AND   o.page_num > 0\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xrylweiy",
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
    "id": "bmrz0adh",
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
    "id": "lwrlwuqc",
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
    "id": "saduxrio",
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
    "id": "tmhib4ma",
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
    "id": "vkift20i",
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
  collection.schema.removeField("7dyljimf")

  // remove
  collection.schema.removeField("6rswffld")

  // remove
  collection.schema.removeField("0v0lel65")

  // remove
  collection.schema.removeField("qlu9edcy")

  // remove
  collection.schema.removeField("cq0ztmao")

  // remove
  collection.schema.removeField("wwh2xzxk")

  return dao.saveCollection(collection)
})
