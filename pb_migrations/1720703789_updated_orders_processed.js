/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tlytss5kj8zsn78")

  collection.options = {
    "query": "SELECT id from orders"
  }

  // remove
  collection.schema.removeField("1xhmmxyw")

  // remove
  collection.schema.removeField("qvespsz2")

  // remove
  collection.schema.removeField("y64zot3d")

  // remove
  collection.schema.removeField("uwv3q7mr")

  // remove
  collection.schema.removeField("yhneraqc")

  // remove
  collection.schema.removeField("bpuhepyv")

  // remove
  collection.schema.removeField("asicgkd8")

  // remove
  collection.schema.removeField("eusfguvs")

  // remove
  collection.schema.removeField("vneujehh")

  // remove
  collection.schema.removeField("kkvwkz6x")

  // remove
  collection.schema.removeField("wu8o7umx")

  // remove
  collection.schema.removeField("2rhezgim")

  // remove
  collection.schema.removeField("rykir2f1")

  // remove
  collection.schema.removeField("drfyvuev")

  // remove
  collection.schema.removeField("fqxll8at")

  // remove
  collection.schema.removeField("arqkq7cm")

  // remove
  collection.schema.removeField("wu2ufe5w")

  // remove
  collection.schema.removeField("oavjdh9k")

  // remove
  collection.schema.removeField("tlsvlfpu")

  // remove
  collection.schema.removeField("beaekm5g")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tlytss5kj8zsn78")

  collection.options = {
    "query": "SELECT\n  o.id as id,\n  o.created as created,\n  o.title as title,\n  o.ext_order_num as ext_order_num,\n  o.circulation as circulation,\n  formats.name as format,\n  o.page_num as page_num,\n  fastenings.name as fastening,\n  obp.block_color as block_color,\n  ocp.cover_color as cover_color,\n  obp.block_departure_elements as block_departure_elements,\n  ocp.cover_departure_elements as cover_departure_elements,\n  obp.block_paper as block_paper,\n  ocp.cover_paper as cover_paper,\n  ocp.is_cover_paper_empty as is_cover_paper_empty,\n  obp.block_printer as block_printer,\n  ocp.cover_printer as cover_printer,\n  ocp.cover_lamination as cover_lamination,\n  obp.block_multiplicity as block_multiplicity,\n  obp.block_format as block_format,\n  ocp.cover_multiplicity as cover_multiplicity,\n  ocp.cover_format as cover_format\nFROM orders o,\n    formats,\n    fastenings,\n    orders_block_processed obp,\n    orders_cover_processed ocp\nWHERE formats.id = o.format\nAND   fastenings.id = o.fastening\nAND   o.id = obp.id\nAND   o.id = ocp.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1xhmmxyw",
    "name": "title",
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
    "id": "qvespsz2",
    "name": "ext_order_num",
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
    "id": "y64zot3d",
    "name": "circulation",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uwv3q7mr",
    "name": "format",
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
    "id": "yhneraqc",
    "name": "page_num",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bpuhepyv",
    "name": "fastening",
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
    "id": "asicgkd8",
    "name": "block_color",
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
    "id": "eusfguvs",
    "name": "cover_color",
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
    "id": "vneujehh",
    "name": "block_departure_elements",
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
    "id": "kkvwkz6x",
    "name": "cover_departure_elements",
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
    "id": "wu8o7umx",
    "name": "block_paper",
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
    "id": "2rhezgim",
    "name": "cover_paper",
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
    "id": "rykir2f1",
    "name": "is_cover_paper_empty",
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
    "id": "drfyvuev",
    "name": "block_printer",
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
    "id": "fqxll8at",
    "name": "cover_printer",
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
    "id": "arqkq7cm",
    "name": "cover_lamination",
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
    "id": "wu2ufe5w",
    "name": "block_multiplicity",
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
    "id": "oavjdh9k",
    "name": "block_format",
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
    "id": "tlsvlfpu",
    "name": "cover_multiplicity",
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
    "id": "beaekm5g",
    "name": "cover_format",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
})
