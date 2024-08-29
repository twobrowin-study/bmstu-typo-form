/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ut9u6d16iq7r7e3")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o,\n       papers p\n  WHERE p.is_cover_available\n  AND   o.cover_printer = \"\"\n  AND   o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN ot.is_cover_paper_only_one_choice THEN p.for_7bc\n      WHEN p.is_empty AND NOT ot.has_block THEN FALSE\n      ELSE TRUE\n    END) as is_available,\n    (CASE\n      WHEN ot.is_cover_paper_only_one_choice THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.is_cover_available\n  AND   o.cover_printer = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN ot.is_cover_paper_only_one_choice THEN p.for_7bc\n      WHEN p.is_empty AND NOT ot.has_block THEN FALSE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_available,\n    (CASE\n      WHEN ot.is_cover_paper_only_one_choice THEN concat(\" - недоступно для вида изделия \", ot.name)\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно при типе \", ot.name)\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      papers p,\n      printers pr,\n      order_types ot\n  WHERE p.is_cover_available\n  AND   pr.id = o.cover_printer\n  AND   ot.id = o.type\n)"
  }

  // remove
  collection.schema.removeField("sbu3eeey")

  // remove
  collection.schema.removeField("9ztmearv")

  // remove
  collection.schema.removeField("kxrczkue")

  // remove
  collection.schema.removeField("rrkaovex")

  // remove
  collection.schema.removeField("clxuxh5n")

  // remove
  collection.schema.removeField("26wsszpj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2nzwtw2j",
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
    "id": "qk77nnkw",
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
    "id": "febzggck",
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
    "id": "0sw0uhep",
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
    "id": "tdel3ljt",
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
    "id": "krnf2i7i",
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
    "query": "SELECT\n  id,\n  order_id,\n  paper_id,\n  name,\n  \"order\",\n  is_available,\n  non_available_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_available,\n    \"\" as non_available_message\n  FROM orders o,\n       papers p\n  WHERE p.is_cover_available\n  AND   o.cover_printer = \"\"\n  AND   o.type = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    NOT p.is_empty OR ot.has_block as is_available,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно для вида изделия \", ot.name)\n      ELSE \"\"\n    END) as non_available_message\n  FROM orders o,\n       papers p,\n       order_types ot\n  WHERE p.is_cover_available\n  AND   o.cover_printer = \"\"\n  AND   ot.id = o.type\n\n  UNION\n\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as paper_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN FALSE\n      WHEN pr.is_risograph AND p.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND p.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND p.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_available,\n    (CASE\n      WHEN p.is_empty AND NOT ot.has_block THEN concat(\" - недоступно при типе \", ot.name)\n      WHEN pr.is_risograph AND p.is_risograph_available THEN \"\"\n      WHEN pr.is_digital AND p.is_digital_available THEN \"\"\n      WHEN pr.is_ofset AND p.is_ofset_available THEN \"\"\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_available_message\n  FROM orders o,\n      papers p,\n      printers pr,\n      order_types ot\n  WHERE p.is_cover_available\n  AND   pr.id = o.cover_printer\n  AND   ot.id = o.type\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sbu3eeey",
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
    "id": "9ztmearv",
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
    "id": "kxrczkue",
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
    "id": "rrkaovex",
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
    "id": "clxuxh5n",
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
    "id": "26wsszpj",
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
  collection.schema.removeField("2nzwtw2j")

  // remove
  collection.schema.removeField("qk77nnkw")

  // remove
  collection.schema.removeField("febzggck")

  // remove
  collection.schema.removeField("0sw0uhep")

  // remove
  collection.schema.removeField("tdel3ljt")

  // remove
  collection.schema.removeField("krnf2i7i")

  return dao.saveCollection(collection)
})
