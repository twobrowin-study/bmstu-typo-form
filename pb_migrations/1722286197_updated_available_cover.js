/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message,\n  full_is_available,\n  full_non_available_message,\n  cover_name\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберите вид изделия\" as non_available_message,\n    FALSE as full_is_available,\n    \" - выберите вид изделия\" as full_non_available_message,\n    \"Выберете вид изделия\" as cover_name\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type = \"\"\n\n  UNION\n  \n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       order_types ot\n  WHERE o.cover_paper = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE \"\"\n    END) as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.id = o.cover_paper\n  AND   ot.id = o.type\n)\n"
  }

  // remove
  collection.schema.removeField("byrvscbv")

  // remove
  collection.schema.removeField("wx8bh2r4")

  // remove
  collection.schema.removeField("ompqtuuh")

  // remove
  collection.schema.removeField("jbmn2fu3")

  // remove
  collection.schema.removeField("is0m5dtq")

  // remove
  collection.schema.removeField("tdud5g2t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ipsym9vj",
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
    "id": "gycmnrnl",
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
    "id": "0vdbixqi",
    "name": "non_available_message",
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
    "id": "xaebtea9",
    "name": "full_is_available",
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
    "id": "cnnwzpgr",
    "name": "full_non_available_message",
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
    "id": "3ndicfnl",
    "name": "cover_name",
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
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message,\n  full_is_available,\n  full_non_available_message,\n  cover_name\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберите тип печати\" as non_available_message,\n    FALSE as full_is_available,\n    \" - выберите тип печати\" as full_non_available_message,\n    \"Выберете тип печати\" as cover_name\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type = \"\"\n\n  UNION\n  \n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       order_types ot\n  WHERE o.cover_paper = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE \"\"\n    END) as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.id = o.cover_paper\n  AND   ot.id = o.type\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "byrvscbv",
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
    "id": "wx8bh2r4",
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
    "id": "ompqtuuh",
    "name": "non_available_message",
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
    "id": "jbmn2fu3",
    "name": "full_is_available",
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
    "id": "is0m5dtq",
    "name": "full_non_available_message",
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
    "id": "tdud5g2t",
    "name": "cover_name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("ipsym9vj")

  // remove
  collection.schema.removeField("gycmnrnl")

  // remove
  collection.schema.removeField("0vdbixqi")

  // remove
  collection.schema.removeField("xaebtea9")

  // remove
  collection.schema.removeField("cnnwzpgr")

  // remove
  collection.schema.removeField("3ndicfnl")

  return dao.saveCollection(collection)
})
