/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vfx2dt8zvqy8pbo")

  collection.options = {
    "query": "SELECT\n  concat(o.id, ot.id) as id,\n  o.id as order_id,\n  ot.id as order_type_id,\n  ot.name as name,\n  ot.\"order\" as \"order\",\n  ot.is_active as is_avaliable,\n  (CASE\n    WHEN NOT ot.is_active THEN \" - в разработке\"\n    ELSE \"\"\n  END) as non_available_message\nFROM orders o,\n     order_types ot"
  }

  // remove
  collection.schema.removeField("r2q2mghe")

  // remove
  collection.schema.removeField("ggpkypdy")

  // remove
  collection.schema.removeField("hhgwohub")

  // remove
  collection.schema.removeField("z3nt3h3u")

  // remove
  collection.schema.removeField("jcqxn7m8")

  // remove
  collection.schema.removeField("d8qsz4bd")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vfx2dt8zvqy8pbo")

  collection.options = {
    "query": "SELECT\n  concat(o.id, ot.id) as id,\n  o.id as order_id,\n  ot.id as order_type_id,\n  ot.name as name,\n  ot.\"order\" as \"order\",\n  ot.is_active as is_avaliable,\n  (CASE\n    WHEN NOT ot.is_active THEN \" - в разработке\"\n    ELSE \"\"\n  END) as non_avaliable_message\nFROM orders o,\n     order_types ot"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r2q2mghe",
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
    "id": "ggpkypdy",
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
    "id": "hhgwohub",
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
    "id": "z3nt3h3u",
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
    "id": "jcqxn7m8",
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
    "id": "d8qsz4bd",
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

  return dao.saveCollection(collection)
})
