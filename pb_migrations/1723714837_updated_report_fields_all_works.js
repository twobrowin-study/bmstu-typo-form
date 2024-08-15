/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gflzilq15gx2qc0")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Работы: листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Работы: Брошюра\n  SELECT\n    rfwb.id,\n    rfwb.order_id,\n    rfwb.section_id,\n    rfwb.\"order\",\n    rfwb.\"name\",\n    rfwb.\"value\",\n    rfwb.units,\n    rfwb.rate,\n    rfwb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Работы: Котроль качества\n  SELECT\n    rfqc.id,\n    rfqc.order_id,\n    rfqc.section_id,\n    rfqc.\"order\",\n    rfqc.\"name\",\n    rfqc.\"value\",\n    rfqc.units,\n    rfqc.rate,\n    rfqc.cost\n  FROM orders o,\n       order_types ot,\n       report_works_quality_control rfqc\n  WHERE rfqc.order_id = o.id\n  AND   ot.id = o.type\n\n  -- UNION\n\n  -- -- Работы: Итого\n  -- SELECT\n  --   rws.id,\n  --   rws.order_id,\n  --   rws.section_id,\n  --   rws.\"order\",\n  --   rws.\"name\",\n  --   rws.\"value\",\n  --   rws.units,\n  --   rws.rate,\n  --   rws.cost\n  -- FROM orders o,\n  --      order_types ot,\n  --      report_works_sum rws\n  -- WHERE rws.order_id = o.id\n  -- AND   ot.id = o.type\n)\n"
  }

  // remove
  collection.schema.removeField("mbkgnu6s")

  // remove
  collection.schema.removeField("95o8rext")

  // remove
  collection.schema.removeField("4jv1wyns")

  // remove
  collection.schema.removeField("jresfmkw")

  // remove
  collection.schema.removeField("vmwovdpr")

  // remove
  collection.schema.removeField("8jhlykye")

  // remove
  collection.schema.removeField("2zgetlyu")

  // remove
  collection.schema.removeField("uqbkvthz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s3adlh3s",
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
    "id": "mow00cvj",
    "name": "section_id",
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
    "id": "znygcagu",
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
    "id": "txl06uma",
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
    "id": "lgjzbeco",
    "name": "value",
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
    "id": "syb000oc",
    "name": "units",
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
    "id": "ffimo5wn",
    "name": "rate",
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
    "id": "vh9gazhb",
    "name": "cost",
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
  const collection = dao.findCollectionByNameOrId("gflzilq15gx2qc0")

  collection.options = {
    "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Работы: листовая продукция\n  SELECT\n    rfwsp.id,\n    rfwsp.order_id,\n    rfwsp.section_id,\n    rfwsp.\"order\",\n    rfwsp.\"name\",\n    rfwsp.\"value\",\n    rfwsp.units,\n    rfwsp.rate,\n    rfwsp.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_sheets_production rfwsp\n  WHERE rfwsp.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Листовая продукция'\n\n  UNION\n\n  -- Работы: Брошюра\n  SELECT\n    rfwb.id,\n    rfwb.order_id,\n    rfwb.section_id,\n    rfwb.\"order\",\n    rfwb.\"name\",\n    rfwb.\"value\",\n    rfwb.units,\n    rfwb.rate,\n    rfwb.cost\n  FROM orders o,\n       order_types ot,\n       report_fields_works_brochure rfwb\n  WHERE rfwb.order_id = o.id\n  AND   ot.id = o.type\n  AND   ot.name = 'Брошюра'\n\n  UNION\n\n  -- Работы: Котроль качества\n  SELECT\n    rfqc.id,\n    rfqc.order_id,\n    rfqc.section_id,\n    rfqc.\"order\",\n    rfqc.\"name\",\n    rfqc.\"value\",\n    rfqc.units,\n    rfqc.rate,\n    rfqc.cost\n  FROM orders o,\n       order_types ot,\n       report_works_quality_control rfqc\n  WHERE rfqc.order_id = o.id\n  AND   ot.id = o.type\n\n  UNION\n\n  -- Работы: Итого\n  SELECT\n    rws.id,\n    rws.order_id,\n    rws.section_id,\n    rws.\"order\",\n    rws.\"name\",\n    rws.\"value\",\n    rws.units,\n    rws.rate,\n    rws.cost\n  FROM orders o,\n       order_types ot,\n       report_works_sum rws\n  WHERE rws.order_id = o.id\n  AND   ot.id = o.type\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mbkgnu6s",
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
    "id": "95o8rext",
    "name": "section_id",
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
    "id": "4jv1wyns",
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
    "id": "jresfmkw",
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
    "id": "vmwovdpr",
    "name": "value",
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
    "id": "8jhlykye",
    "name": "units",
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
    "id": "2zgetlyu",
    "name": "rate",
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
    "id": "uqbkvthz",
    "name": "cost",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("s3adlh3s")

  // remove
  collection.schema.removeField("mow00cvj")

  // remove
  collection.schema.removeField("znygcagu")

  // remove
  collection.schema.removeField("txl06uma")

  // remove
  collection.schema.removeField("lgjzbeco")

  // remove
  collection.schema.removeField("syb000oc")

  // remove
  collection.schema.removeField("ffimo5wn")

  // remove
  collection.schema.removeField("vh9gazhb")

  return dao.saveCollection(collection)
})
