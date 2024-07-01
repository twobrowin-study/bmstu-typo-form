/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9rz96wpe0v9d93")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN TRUE\n      WHEN NOT c.is_cover_lamination_available and NOT o.cover_lamination THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN NULL\n      WHEN NOT c.is_cover_lamination_available and NOT o.cover_lamination THEN NULL\n      ELSE concat(' - недоступно при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   NOT o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name, ' и при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   o.cover_lamination\n)"
  }

  // remove
  collection.schema.removeField("caozxeip")

  // remove
  collection.schema.removeField("g0661yvy")

  // remove
  collection.schema.removeField("3trp5bfg")

  // remove
  collection.schema.removeField("9lf7v7zx")

  // remove
  collection.schema.removeField("zs7s1xnn")

  // remove
  collection.schema.removeField("xvvqoomt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pqtyling",
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
    "id": "xbdf5tox",
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
    "id": "vo8611ac",
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
    "id": "weqtspv2",
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
    "id": "cowybnmr",
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
    "id": "wruxmfx9",
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
    "query": "SELECT\n  id,\n  order_id,\n  format_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as format_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "caozxeip",
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
    "id": "g0661yvy",
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
    "id": "3trp5bfg",
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
    "id": "9lf7v7zx",
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
    "id": "zs7s1xnn",
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
    "id": "xvvqoomt",
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
  collection.schema.removeField("pqtyling")

  // remove
  collection.schema.removeField("xbdf5tox")

  // remove
  collection.schema.removeField("vo8611ac")

  // remove
  collection.schema.removeField("weqtspv2")

  // remove
  collection.schema.removeField("cowybnmr")

  // remove
  collection.schema.removeField("wruxmfx9")

  return dao.saveCollection(collection)
})
