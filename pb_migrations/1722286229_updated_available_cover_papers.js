/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n  AND   o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    NOT p.is_empty OR ot.has_block as is_avaliable,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN FALSE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно при типе \", ot.name)\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      papers p,\n      printers pr,\n      order_types ot\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   ot.id = o.type\n)"
  }

  // remove
  collection.schema.removeField("sgrfma6m")

  // remove
  collection.schema.removeField("q0re4x2g")

  // remove
  collection.schema.removeField("ixrncusq")

  // remove
  collection.schema.removeField("wzh1ommc")

  // remove
  collection.schema.removeField("ddkivnag")

  // remove
  collection.schema.removeField("yzc3ps2a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ywd6typd",
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
    "id": "4ddbqkwo",
    "name": "paper_id",
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
    "id": "1xxlzab8",
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
    "id": "jxthkvsd",
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
    "id": "jvz6orrn",
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
    "id": "7llrrpg3",
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
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    \"\" as non_available_message\n  FROM orders o,\n       papers p\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n  AND   o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    NOT p.is_empty OR ot.has_block as is_avaliable,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно для типа печати \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.is_cover_avaliable\n  AND   o.cover_printer = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN FALSE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно при типе \", ot.name)\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      papers p,\n      printers pr,\n      order_types ot\n  WHERE p.is_cover_avaliable\n  AND   pr.id = o.cover_printer\n  AND   ot.id = o.type\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgrfma6m",
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
    "id": "q0re4x2g",
    "name": "paper_id",
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
    "id": "ixrncusq",
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
    "id": "wzh1ommc",
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
    "id": "ddkivnag",
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
    "id": "yzc3ps2a",
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
  collection.schema.removeField("ywd6typd")

  // remove
  collection.schema.removeField("4ddbqkwo")

  // remove
  collection.schema.removeField("1xxlzab8")

  // remove
  collection.schema.removeField("jxthkvsd")

  // remove
  collection.schema.removeField("jvz6orrn")

  // remove
  collection.schema.removeField("7llrrpg3")

  return dao.saveCollection(collection)
})
