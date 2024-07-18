/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("buic5j8825frmrd")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message,\n  full_is_available,\n  full_non_available_message,\n  cover_name\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_available_message,\n    FALSE as full_is_available,\n    \" - выберете тип печати\" as full_non_available_message,\n    \"Выберете тип печати\" as cover_name\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type = \"\"\n\n  UNION\n  \n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       order_types ot\n  WHERE o.cover_paper = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE \"\"\n    END) as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.id = o.cover_paper\n  AND   ot.id = o.type\n)\n"
  }

  // remove
  collection.schema.removeField("bigexzsa")

  // remove
  collection.schema.removeField("rskcqeo5")

  // remove
  collection.schema.removeField("h2cbjvdp")

  // remove
  collection.schema.removeField("6g79pxw6")

  // remove
  collection.schema.removeField("tb2rndsy")

  // remove
  collection.schema.removeField("7q2u9twr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qxpyx5bs",
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
    "id": "mv1oqazr",
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
    "id": "5twzsazr",
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
    "id": "d5wgnakj",
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
    "id": "guxxsdsn",
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
    "id": "rav6e6tq",
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
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_available_message,\n  full_is_available,\n  full_non_available_message,\n  cover_name\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_available_message,\n    FALSE as full_is_available,\n    \" - выберете тип печати\" as full_non_available_message,\n    \"Выберете тип печати\" as cover_name\n  FROM orders o\n  WHERE o.cover_paper = \"\"\n  AND   o.type = \"\"\n\n  UNION\n  \n  SELECT\n    o.id as id,\n    o.id as order_id,\n    TRUE as is_available,\n    \"\" as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       order_types ot\n  WHERE ot.id = o.cover_paper\n  AND   o.type != \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    NOT p.is_empty as is_available,\n    (CASE\n      WHEN p.is_empty THEN concat(\" - недоступно для бумаги \", p.name)\n      ELSE \"\"\n    END) as non_available_message,\n    TRUE as full_is_available,\n    \"\" as full_non_available_message,\n    ot.cover_name as cover_name\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE ot.id = o.cover_paper\n  AND   o.type != \"\"\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bigexzsa",
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
    "id": "rskcqeo5",
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
    "id": "h2cbjvdp",
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
    "id": "6g79pxw6",
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
    "id": "tb2rndsy",
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
    "id": "7q2u9twr",
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
  collection.schema.removeField("qxpyx5bs")

  // remove
  collection.schema.removeField("mv1oqazr")

  // remove
  collection.schema.removeField("5twzsazr")

  // remove
  collection.schema.removeField("d5wgnakj")

  // remove
  collection.schema.removeField("guxxsdsn")

  // remove
  collection.schema.removeField("rav6e6tq")

  return dao.saveCollection(collection)
})
