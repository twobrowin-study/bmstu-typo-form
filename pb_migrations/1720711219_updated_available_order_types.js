/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vfx2dt8zvqy8pbo")

  collection.options = {
    "query": "SELECT\n  concat(o.id, ot.id) as id,\n  o.id as order_id,\n  ot.id as order_type_id,\n  ot.name as name,\n  ot.\"order\" as \"order\",\n  ot.is_active as is_avaliable,\n  (CASE\n    WHEN NOT ot.is_active THEN \" - в разработке\"\n    ELSE \"\"\n  END) as non_available_message,\n  ot.cover_name as cover_name \nFROM orders o,\n     order_types ot"
  }

  // remove
  collection.schema.removeField("ysklu8qo")

  // remove
  collection.schema.removeField("0l58fgtn")

  // remove
  collection.schema.removeField("gk2bmvar")

  // remove
  collection.schema.removeField("flpvictl")

  // remove
  collection.schema.removeField("nf5whf0e")

  // remove
  collection.schema.removeField("6net8kyo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "faxkfhqd",
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
    "id": "lcnngoua",
    "name": "order_type_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1f5ieiczr37cglw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2rni3dz",
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
    "id": "r5orujij",
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
    "id": "czoynncy",
    "name": "is_avaliable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5icqoslc",
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
    "id": "gpa8mlxc",
    "name": "cover_name",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vfx2dt8zvqy8pbo")

  collection.options = {
    "query": "SELECT\n  concat(o.id, ot.id) as id,\n  o.id as order_id,\n  ot.id as order_type_id,\n  ot.name as name,\n  ot.\"order\" as \"order\",\n  ot.is_active as is_avaliable,\n  (CASE\n    WHEN NOT ot.is_active THEN \" - в разработке\"\n    ELSE \"\"\n  END) as non_available_message\nFROM orders o,\n     order_types ot"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ysklu8qo",
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
    "id": "0l58fgtn",
    "name": "order_type_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1f5ieiczr37cglw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gk2bmvar",
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
    "id": "flpvictl",
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
    "id": "nf5whf0e",
    "name": "is_avaliable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6net8kyo",
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
  collection.schema.removeField("faxkfhqd")

  // remove
  collection.schema.removeField("lcnngoua")

  // remove
  collection.schema.removeField("i2rni3dz")

  // remove
  collection.schema.removeField("r5orujij")

  // remove
  collection.schema.removeField("czoynncy")

  // remove
  collection.schema.removeField("5icqoslc")

  // remove
  collection.schema.removeField("gpa8mlxc")

  return dao.saveCollection(collection)
})
