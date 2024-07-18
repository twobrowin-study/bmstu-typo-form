/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s57yyb0fdj96zxf")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_full_sheets,\n  cover_ofset_forms,\n  cover_product_column_height\nFROM (\n  SELECT\n    o.id as id,\n    ceiling((oec.estimated_circulation)/(ocp.cover_multiplicity*cc.print_side_num)) as cover_full_sheets,\n    (CASE\n      WHEN cp.is_ofset THEN cc.ofset_from_num + 1\n      ELSE NULL\n    END) as cover_ofset_forms,\n    ceiling((oec.estimated_circulation)/(ocp.cover_multiplicity))*cpp.thickness as cover_product_column_height\n  FROM orders o,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc,\n      printers cp,\n      papers cpp\n  WHERE oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n  AND   cp.id = o.cover_printer\n  AND   cpp.id = o.cover_paper\n  AND   NOT cpp.is_empty\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_full_sheets,\n    NULL as cover_ofset_forms,\n    NULL as cover_product_column_height\n  FROM orders o,\n      papers cpp\n  WHERE cpp.id = o.cover_paper\n  AND   NOT cpp.is_empty\n)"
  }

  // remove
  collection.schema.removeField("wou1pr5j")

  // remove
  collection.schema.removeField("sj5b8cab")

  // remove
  collection.schema.removeField("7ua2o4ly")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cum0enj4",
    "name": "cover_full_sheets",
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
    "id": "hau1z4wi",
    "name": "cover_ofset_forms",
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
    "id": "asffhjiu",
    "name": "cover_product_column_height",
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
  const collection = dao.findCollectionByNameOrId("s57yyb0fdj96zxf")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_full_sheets,\n  cover_ofset_forms,\n  cover_product_column_height\nFROM (\n  SELECT\n    o.id as id,\n    ceiling((oec.estimated_circulation)/(ocp.cover_multiplicity*cc.print_side_num)) as cover_full_sheets,\n    (CASE\n      WHEN cp.is_ofset THEN cc.ofset_from_num + 1\n      ELSE NULL\n    END) as cover_ofset_forms,\n    ceiling((oec.estimated_circulation)/(ocp.cover_multiplicity))*cpp.thickness as cover_product_column_height\n  FROM orders o,\n      order_types ot,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc,\n      printers cp,\n      papers cpp\n  WHERE ot.id = o.type\n  AND   ot.has_block\n  AND   oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n  AND   cp.id = o.cover_printer\n  AND   cpp.id = o.cover_paper\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_full_sheets,\n    NULL as cover_ofset_forms,\n    NULL as cover_product_column_height\n  FROM orders o,\n      order_types ot\n  WHERE ot.id = o.type\n  AND   NOT ot.has_block\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wou1pr5j",
    "name": "cover_full_sheets",
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
    "id": "sj5b8cab",
    "name": "cover_ofset_forms",
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
    "id": "7ua2o4ly",
    "name": "cover_product_column_height",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("cum0enj4")

  // remove
  collection.schema.removeField("hau1z4wi")

  // remove
  collection.schema.removeField("asffhjiu")

  return dao.saveCollection(collection)
})
