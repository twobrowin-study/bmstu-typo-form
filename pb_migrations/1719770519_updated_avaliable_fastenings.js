/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  f.id as fastening_id,\n  f.name as name,\n  f.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     fastenings f\nWHERE o.format = \"\""
  }

  // remove
  collection.schema.removeField("2pipalwp")

  // remove
  collection.schema.removeField("wreughks")

  // remove
  collection.schema.removeField("0mvho8hw")

  // remove
  collection.schema.removeField("h31kqugu")

  // remove
  collection.schema.removeField("9djuefi5")

  // remove
  collection.schema.removeField("8cnmhw5h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fdbr75rp",
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
    "id": "emrnxpb0",
    "name": "fastening_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6lws3vcqcvs3ewy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4jakk3pi",
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
    "id": "rr1yzkbr",
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
    "id": "vm5dutwa",
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
    "id": "aaapvt8m",
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
  const collection = dao.findCollectionByNameOrId("psdddeb14thhxan")

  collection.options = {
    "query": "SELECT\n  concat(o.id, f.id) as id,\n  o.id as order_id,\n  f.id as fastening_id,\n  f.name as name,\n  f.\"order\" as \"order\",\n  TRUE as is_avaliable,\n  NULL as non_avaliable_message\nFROM orders o,\n     fastenings f\nWHERE o.format ISNULL"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2pipalwp",
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
    "id": "wreughks",
    "name": "fastening_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6lws3vcqcvs3ewy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0mvho8hw",
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
    "id": "h31kqugu",
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
    "id": "9djuefi5",
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
    "id": "8cnmhw5h",
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
  collection.schema.removeField("fdbr75rp")

  // remove
  collection.schema.removeField("emrnxpb0")

  // remove
  collection.schema.removeField("4jakk3pi")

  // remove
  collection.schema.removeField("rr1yzkbr")

  // remove
  collection.schema.removeField("vm5dutwa")

  // remove
  collection.schema.removeField("aaapvt8m")

  return dao.saveCollection(collection)
})
