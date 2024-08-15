/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0c7j6bdk44jd5u")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o,\n       formats f\n  WHERE o.type = \"\"\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f\n  WHERE ot.id = o.type\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет блока')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       printers bp\n  WHERE ot.id = o.type\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   bp.id = o.block_printer\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(' - недоступно для принтера обложки ', cp.name, ' при элементах на вылет обложки')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers cp\n  WHERE ot.id = o.type\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   cp.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет блока')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers bp,\n      fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   bp.id = o.block_printer\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(' - недоступно для принтера обложки ', cp.name, ' при элементах на вылет обложки')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers cp,\n      fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   cp.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(' - недоступно для принтера обложки ', cp.name, ' при элементах на вылет обложки')\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_available THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет блока')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers cp,\n      printers bp,\n      fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   bp.id = o.block_printer\n  AND   cp.id = o.cover_printer\n)"
  }

  // remove
  collection.schema.removeField("znmlvz09")

  // remove
  collection.schema.removeField("pvvvvioj")

  // remove
  collection.schema.removeField("7zbfxiy1")

  // remove
  collection.schema.removeField("4eui6pou")

  // remove
  collection.schema.removeField("romxxqd7")

  // remove
  collection.schema.removeField("stvkeqqq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vkgt6ta4",
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
    "id": "x1pokh1a",
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
    "id": "5ohkcxjb",
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
    "id": "milrqhfi",
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
    "id": "pm8p5rag",
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
    "id": "pyoqoisb",
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
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       formats f\n  WHERE o.type = \"\"\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f\n  WHERE ot.id = o.type\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет блока')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n       formats f,\n       printers bp\n  WHERE ot.id = o.type\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   bp.id = o.block_printer\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера обложки ', cp.name, ' при элементах на вылет обложки')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers cp\n  WHERE ot.id = o.type\n  AND   (o.fastening = \"\" OR o.page_num = 0)\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   cp.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет блока')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers bp,\n      fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   bp.id = o.block_printer\n  AND   (o.cover_printer = \"\" OR o.cover_departure_elements = FALSE)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера обложки ', cp.name, ' при элементах на вылет обложки')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers cp,\n      fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   (o.block_printer = \"\" OR o.block_departure_elements = FALSE)\n  AND   cp.id = o.cover_printer\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as format_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN FALSE\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN FALSE\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN fa.is_brace AND o.page_num > f.brace_max_pages THEN concat(' - количество страниц превышает ', f.brace_max_pages, ' для типа крепления ', fa.name)\n      WHEN o.cover_departure_elements and cp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера обложки ', cp.name, ' при элементах на вылет обложки')\n      WHEN o.block_departure_elements and bp.is_risograph AND NOT f.is_risograph_departure_elements_avaliable THEN concat(' - недоступно для принтера блока ', bp.name, ' при элементах на вылет блока')\n      WHEN f.is_a3 AND NOT ot.is_a3_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN f.is_small AND NOT ot.is_small_formats_available THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       order_types ot,\n      formats f,\n      printers cp,\n      printers bp,\n      fastenings fa\n  WHERE ot.id = o.type\n  AND   o.fastening = fa.id\n  AND   o.page_num > 0\n  AND   bp.id = o.block_printer\n  AND   cp.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "znmlvz09",
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
    "id": "pvvvvioj",
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
    "id": "7zbfxiy1",
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
    "id": "4eui6pou",
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
    "id": "romxxqd7",
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
    "id": "stvkeqqq",
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
  collection.schema.removeField("vkgt6ta4")

  // remove
  collection.schema.removeField("x1pokh1a")

  // remove
  collection.schema.removeField("5ohkcxjb")

  // remove
  collection.schema.removeField("milrqhfi")

  // remove
  collection.schema.removeField("pm8p5rag")

  // remove
  collection.schema.removeField("pyoqoisb")

  return dao.saveCollection(collection)
})
