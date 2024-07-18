/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9rz96wpe0v9d93")

  collection.options = {
    "query": "SELECT\n  concat(o.id, c.id) as id,\n  o.id as order_id,\n  c.id as color_id,\n  c.name as name,\n  c.\"order\" as \"order\",\n  (CASE\n    WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n    WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n    WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n    ELSE FALSE\n  END) as is_avaliable,\n  (CASE\n    WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n    WHEN pr.is_digital AND c.is_digital_available THEN NULL\n    WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n    ELSE concat(' - недоступно для принтера ', pr.name)\n  END) as non_avaliable_message\nFROM orders o,\n    colors c,\n    printers pr\nWHERE c.is_cover_avaliable\nAND   pr.id = o.cover_printer\n"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rz1wlnib",
    "name": "order_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wqjj2mpzk0zikk1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "18iq9qxx",
    "name": "color_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "yuf9jzkx4zs4mwb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8mfxnrjw",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ktg5m79j",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "loxgx0aa",
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
    "id": "andshdlf",
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
    "query": "SELECT\n  id,\n  order_id,\n  color_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN TRUE\n      WHEN NOT o.cover_lamination THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN c.is_cover_lamination_available and o.cover_lamination THEN NULL\n      WHEN NOT o.cover_lamination THEN NULL\n      ELSE concat(' - недоступно при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c\n  WHERE c.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   NOT o.cover_lamination\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available AND c.is_cover_lamination_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available AND c.is_cover_lamination_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name, ' и при ламинации')\n    END) as non_avaliable_message\n  FROM orders o,\n      colors c,\n      printers pr\n  WHERE c.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   o.cover_lamination\n)"
  }

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

  // remove
  collection.schema.removeField("rz1wlnib")

  // remove
  collection.schema.removeField("18iq9qxx")

  // remove
  collection.schema.removeField("8mfxnrjw")

  // remove
  collection.schema.removeField("ktg5m79j")

  // remove
  collection.schema.removeField("loxgx0aa")

  // remove
  collection.schema.removeField("andshdlf")

  return dao.saveCollection(collection)
})
