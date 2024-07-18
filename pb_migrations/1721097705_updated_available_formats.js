/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0c7j6bdk44jd5u")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n      formats f\n  WHERE (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fa\n  WHERE o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет')\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      printers bp\n  WHERE (o.fastening = \"\" OR o.page_num = 0)\n  AND   bp.id = o.block_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет')\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      printers bp,\n      fastenings fa\n  WHERE o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   bp.id = o.block_printer\n)"
  }

  // remove
  collection.schema.removeField("vu4rkpzi")

  // remove
  collection.schema.removeField("9kcev7kb")

  // remove
  collection.schema.removeField("kvl04sgl")

  // remove
  collection.schema.removeField("h8qtugsu")

  // remove
  collection.schema.removeField("tz597rci")

  // remove
  collection.schema.removeField("flpny4ym")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elrnfmmq",
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
    "id": "xfjhjdc9",
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
    "id": "fftfhixx",
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
    "id": "p8lpdwug",
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
    "id": "ppp1c9if",
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
    "id": "ighlbbxw",
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
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n      formats f\n  WHERE (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      fastenings fa\n  WHERE o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет')\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n      formats f,\n      printers bp\n  WHERE (o.fastening = \"\" OR o.page_num = 0)\n  AND   bp.id = o.block_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vu4rkpzi",
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
    "id": "9kcev7kb",
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
    "id": "kvl04sgl",
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
    "id": "h8qtugsu",
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
    "id": "tz597rci",
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
    "id": "flpny4ym",
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
  collection.schema.removeField("elrnfmmq")

  // remove
  collection.schema.removeField("xfjhjdc9")

  // remove
  collection.schema.removeField("fftfhixx")

  // remove
  collection.schema.removeField("p8lpdwug")

  // remove
  collection.schema.removeField("ppp1c9if")

  // remove
  collection.schema.removeField("ighlbbxw")

  return dao.saveCollection(collection)
})
