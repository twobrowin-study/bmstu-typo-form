/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4nnbua1ao2hmvbk")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  fastening_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    FALSE as is_avaliable,\n    \" - выберете тип печати\" as non_avaliable_message\n  FROM orders o,\n      fastenings f\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    ot.has_fastening as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_fastening THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE NULL\n    END) as non_avaliable_message\n  FROM orders o,\n       order_types ot,\n       fastenings f\n  WHERE ot.id = o.type\n  AND   NOT f.is_brace \n  OR    (o.format = \"\" OR o.page_num = 0)\n\n  UNION\n\n  SELECT\n    concat(o.id, f.id) as id,\n    o.id as order_id,\n    f.id as fastening_id,\n    f.name as name,\n    f.\"order\" as \"order\",\n    (CASE\n      WHEN NOT ot.has_fastening THEN FALSE\n      WHEN o.page_num > fm.brace_max_pages THEN FALSE\n      ELSE TRUE\n    END) as is_avaliable,\n    (CASE\n      WHEN NOT ot.has_fastening THEN concat(\" - недоступно для типа печати \", ot.name)\n      WHEN o.page_num > fm.brace_max_pages THEN concat(' - количество страниц превышает ', fm.brace_max_pages, ' для формата ', fm.name)\n      ELSE NULL\n    END) as non_avaliable_message\n  FROM orders o,\n       order_types ot,\n       fastenings f,\n       formats fm\n  WHERE ot.id = o.type\n  AND   f.is_brace\n  AND   o.format = fm.id\n  AND   o.page_num > 0\n)"
  }

  // remove
  collection.schema.removeField("pngrxarq")

  // remove
  collection.schema.removeField("nv0shky5")

  // remove
  collection.schema.removeField("n7iqg36p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jdhdlxxc",
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
    "id": "kmqekf7b",
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
    "id": "zlm63icf",
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
    "id": "7nr9xswu",
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
    "id": "s9wi9gcu",
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
    "id": "xwnvgmyo",
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
  const collection = dao.findCollectionByNameOrId("4nnbua1ao2hmvbk")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  is_available,\n  non_avaliable_message\nFROM (\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    FALSE as is_available,\n    \" - выберете тип печати\" as non_avaliable_message\n  FROM orders o\n  WHERE o.type = \"\"\n\n  UNION\n\n  SELECT\n    o.id as id,\n    o.id as order_id,\n    ot.has_block as is_available,\n    (CASE\n      WHEN NOT ot.has_block THEN concat(\" - недоступно для типа \", ot.name)\n      ELSE NULL\n    END) as non_avaliable_message\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pngrxarq",
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
    "id": "nv0shky5",
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
    "id": "n7iqg36p",
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
  collection.schema.removeField("jdhdlxxc")

  // remove
  collection.schema.removeField("kmqekf7b")

  // remove
  collection.schema.removeField("zlm63icf")

  // remove
  collection.schema.removeField("7nr9xswu")

  // remove
  collection.schema.removeField("s9wi9gcu")

  // remove
  collection.schema.removeField("xwnvgmyo")

  return dao.saveCollection(collection)
})
