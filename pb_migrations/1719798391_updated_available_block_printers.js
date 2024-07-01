/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s77sghsjzdcfirt")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN NULL\n        WHEN p.is_digital AND pp.is_digital_available THEN NULL\n        WHEN p.is_ofset AND pp.is_ofset_available THEN NULL\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN NULL\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN NULL\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN NULL\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n)"
  }

  // remove
  collection.schema.removeField("oejqr3dd")

  // remove
  collection.schema.removeField("dxdvwa68")

  // remove
  collection.schema.removeField("q0dq6wbt")

  // remove
  collection.schema.removeField("cefk0d0q")

  // remove
  collection.schema.removeField("tltffcyq")

  // remove
  collection.schema.removeField("jjwsw4bf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8g2cou9s",
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
    "id": "yov4avgg",
    "name": "printer_id",
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
    "id": "uud7nawa",
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
    "id": "dcv2bu6r",
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
    "id": "4bhm5gzo",
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
    "id": "bmkul9av",
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
  const collection = dao.findCollectionByNameOrId("s77sghsjzdcfirt")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  printer_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       printers p\n  WHERE o.block_paper = \"\"\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для бумаги ', pp.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp\n  WHERE pp.id = o.block_paper\n  AND   o.block_color = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND с.is_ofset_available THEN TRUE\n        ELSE concat(' - недоступно для цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       colors с\n  WHERE с.id = o.block_color\n  AND   o.block_paper = \"\"\n  \n  UNION\n  \n  SELECT\n    concat(o.id, p.id) as id,\n    o.id as order_id,\n    p.id as printer_id,\n    p.name as name,\n    p.\"order\" as \"order\",\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN TRUE\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN TRUE\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN TRUE\n        ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n        WHEN p.is_risograph AND pp.is_risograph_available AND с.is_risograph_available THEN NULL\n        WHEN p.is_digital AND pp.is_digital_available AND с.is_digital_available THEN NULL\n        WHEN p.is_ofset AND pp.is_ofset_available AND с.is_ofset_available THEN NULL\n        ELSE concat(' - недоступно для бумаги ', pp.name, ' и цветности ', с.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       printers p,\n       papers pp,\n       colors с\n  WHERE pp.id = o.block_paper\n  AND   с.id = o.block_color\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oejqr3dd",
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
    "id": "dxdvwa68",
    "name": "printer_id",
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
    "id": "q0dq6wbt",
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
    "id": "cefk0d0q",
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
    "id": "tltffcyq",
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
    "id": "jjwsw4bf",
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
  collection.schema.removeField("8g2cou9s")

  // remove
  collection.schema.removeField("yov4avgg")

  // remove
  collection.schema.removeField("uud7nawa")

  // remove
  collection.schema.removeField("dcv2bu6r")

  // remove
  collection.schema.removeField("4bhm5gzo")

  // remove
  collection.schema.removeField("bmkul9av")

  return dao.saveCollection(collection)
})
