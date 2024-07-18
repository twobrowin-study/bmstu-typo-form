/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9rz96wpe0v9d93")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  color_id,\n  name,\n  \"order\",\n  is_avaliable,\n  non_avaliable_message\nFROM (\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    TRUE as is_avaliable,\n    NULL as non_avaliable_message\n  FROM orders o,\n       colors c\n  WHERE o.cover_printer = \"\"\n\n  UNION\n\n  SELECT\n    concat(o.id, c.id) as id,\n    o.id as order_id,\n    c.id as color_id,\n    c.name as name,\n    c.\"order\" as \"order\",\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n      WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n      WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n      ELSE FALSE\n    END) as is_avaliable,\n    (CASE\n      WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n      WHEN pr.is_digital AND c.is_digital_available THEN NULL\n      WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n      ELSE concat(' - недоступно для принтера ', pr.name)\n    END) as non_avaliable_message\n  FROM orders o,\n       colors c,\n       printers pr\n  WHERE pr.id = o.cover_printer\n)"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "msx7bf8a",
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
    "id": "ai9xxbah",
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
    "id": "3evfzjmq",
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
    "id": "j655y9du",
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
    "id": "nrua0wre",
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
    "id": "2kz47q3g",
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
    "query": "SELECT\n  concat(o.id, c.id) as id,\n  o.id as order_id,\n  c.id as color_id,\n  c.name as name,\n  c.\"order\" as \"order\",\n  (CASE\n    WHEN pr.is_risograph AND c.is_risograph_available THEN TRUE\n    WHEN pr.is_digital AND c.is_digital_available THEN TRUE\n    WHEN pr.is_ofset AND c.is_ofset_available THEN TRUE\n    ELSE FALSE\n  END) as is_avaliable,\n  (CASE\n    WHEN pr.is_risograph AND c.is_risograph_available THEN NULL\n    WHEN pr.is_digital AND c.is_digital_available THEN NULL\n    WHEN pr.is_ofset AND c.is_ofset_available THEN NULL\n    ELSE concat(' - недоступно для принтера ', pr.name)\n  END) as non_avaliable_message\nFROM orders o,\n    colors c,\n    printers pr\nWHERE c.is_cover_avaliable\nAND   pr.id = o.cover_printer\n"
  }

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

  // remove
  collection.schema.removeField("msx7bf8a")

  // remove
  collection.schema.removeField("ai9xxbah")

  // remove
  collection.schema.removeField("3evfzjmq")

  // remove
  collection.schema.removeField("j655y9du")

  // remove
  collection.schema.removeField("nrua0wre")

  // remove
  collection.schema.removeField("2kz47q3g")

  return dao.saveCollection(collection)
})
