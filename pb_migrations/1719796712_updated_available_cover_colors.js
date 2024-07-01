/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9rz96wpe0v9d93")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  color_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN TRUE\n      WHEN NOT o.cover_lamination THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN NULL\n      WHEN NOT o.cover_lamination THEN NULL\n      ELSE concat(' - недоступно при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   NOT o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name, ' и при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   o.cover_lamination\n)"
  }

  // remove
  collection.schema.removeField("ouzvyxni")

  // remove
  collection.schema.removeField("ugpu50kn")

  // remove
  collection.schema.removeField("4gtvndlj")

  // remove
  collection.schema.removeField("t1scjubx")

  // remove
  collection.schema.removeField("h1mnjgfe")

  // remove
  collection.schema.removeField("gcrxoh7g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zf4qaawx",
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
    "id": "x22uvrni",
    "name": "color_id",
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
    "id": "kvjvdhnn",
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
    "id": "yjjuftgz",
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
    "id": "sp7tzcyt",
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
    "id": "j3kuo2lg",
    "name": "non_avaliable_message",
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
  const collection = dao.findCollectionByNameOrId("m9rz96wpe0v9d93")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN TRUE\n      WHEN NOT o.cover_lamination THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN NULL\n      WHEN NOT o.cover_lamination THEN NULL\n      ELSE concat(' - недоступно при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   NOT o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name, ' и при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   o.cover_lamination\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ouzvyxni",
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
    "id": "ugpu50kn",
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
    "id": "4gtvndlj",
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
    "id": "t1scjubx",
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
    "id": "h1mnjgfe",
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
    "id": "gcrxoh7g",
    "name": "non_avaliable_message",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("zf4qaawx")

  // remove
  collection.schema.removeField("x22uvrni")

  // remove
  collection.schema.removeField("kvjvdhnn")

  // remove
  collection.schema.removeField("yjjuftgz")

  // remove
  collection.schema.removeField("sp7tzcyt")

  // remove
  collection.schema.removeField("j3kuo2lg")

  return dao.saveCollection(collection)
})
