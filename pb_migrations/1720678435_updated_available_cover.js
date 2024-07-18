/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type = \"\"\n\n  UNION\n  \n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type != \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN NOT p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE NULL\n    END) as non_avaliable_message\n  FROM orders o,\n       papers p\n  WHERE p.id = o.cover_paper\n  AND   o.type != \"\"\n)\n"
  }

  // remove
  collection.schema.removeField("guioxrdk")

  // remove
  collection.schema.removeField("hv6ifnkx")

  // remove
  collection.schema.removeField("abb0mc5g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jwpshmqc",
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
    "id": "z5devcmc",
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
    "id": "jievtwdq",
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
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    NULL as non_avaliable_message\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN NOT p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE NULL\n    END) as non_avaliable_message\n  FROM orders o,\n       papers p\n  WHERE p.id = o.cover_paper\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "guioxrdk",
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
    "id": "hv6ifnkx",
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
    "id": "abb0mc5g",
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
  collection.schema.removeField("jwpshmqc")

  // remove
  collection.schema.removeField("z5devcmc")

  // remove
  collection.schema.removeField("jievtwdq")

  return dao.saveCollection(collection)
})
