/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s57yyb0fdj96zxf")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_sheets,\n  cover_print_sheets,\n  cover_product_column_height,\n  cover_ofset_forms,\n  cover_risograph_forms\nFROM (\n  SELECT\n    o.id as id,\n    \n    -- Количество листов, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation/ocp.cover_multiplicity) as cover_sheets,\n    \n    -- Количество сторон печати, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation*cc.print_side_num/ocp.cover_multiplicity) as cover_print_sheets,\n\n    -- Высота столба итоговой продукции обложки или листовой продукции\n    round(ceiling(oec.estimated_circulation/ocp.cover_multiplicity)*cpp.thickness, 2) as cover_product_column_height,\n\n    -- Количество форм офсета, требуемых на обложку или листовую печать\n    (CASE\n      WHEN cp.is_ofset THEN cc.ofset_from_num + 1\n      ELSE NULL\n    END) as cover_ofset_forms,\n\n    -- Количество мастер форм ризографа, требуемых на обложку или листовую печать\n    (CASE\n      WHEN cp.is_risograph THEN cc.risograph_master_films + 1\n      ELSE NULL\n    END) as cover_risograph_forms\n  FROM orders o,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc,\n      printers cp,\n      papers cpp\n  WHERE oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n  AND   cp.id = o.cover_printer\n  AND   cpp.id = o.cover_paper\n  AND   NOT cpp.is_empty\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_sheets,\n    NULL as cover_print_sheets,\n    NULL as cover_product_column_height,\n    NULL as cover_ofset_forms,\n    NULL as cover_risograph_forms\n  FROM orders o,\n      papers cpp\n  WHERE cpp.id = o.cover_paper\n  AND   cpp.is_empty\n)"
  }

  // remove
  collection.schema.removeField("hrywmpcb")

  // remove
  collection.schema.removeField("ydrz11v6")

  // remove
  collection.schema.removeField("zzwqfels")

  // remove
  collection.schema.removeField("hrunksmy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "voflwpeb",
    "name": "cover_sheets",
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
    "id": "8fnwu46m",
    "name": "cover_print_sheets",
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
    "id": "dtbepv2e",
    "name": "cover_product_column_height",
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
    "id": "opeu5jbk",
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
    "id": "gcrtx2z7",
    "name": "cover_risograph_forms",
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
    "query": "SELECT\n  id,\n  cover_sheets,\n  cover_print_sheets,\n  cover_product_column_height,\n  cover_ofset_forms\nFROM (\n  SELECT\n    o.id as id,\n    \n    -- Количество листов, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation/ocp.cover_multiplicity) as cover_sheets,\n    \n    -- Количество сторон печати, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation*cc.print_side_num/ocp.cover_multiplicity) as cover_print_sheets,\n\n    -- Высота столба итоговой продукции обложки или листовой продукции\n    round(ceiling(oec.estimated_circulation/ocp.cover_multiplicity)*cpp.thickness, 2) as cover_product_column_height,\n\n    -- Количество форм офсета, требуемых на обложку или листовую печать\n    (CASE\n      WHEN cp.is_ofset THEN cc.ofset_from_num + 1\n      ELSE NULL\n    END) as cover_ofset_forms\n  FROM orders o,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc,\n      printers cp,\n      papers cpp\n  WHERE oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n  AND   cp.id = o.cover_printer\n  AND   cpp.id = o.cover_paper\n  AND   NOT cpp.is_empty\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_sheets,\n    NULL as cover_print_sheets,\n    NULL as cover_product_column_height,\n    NULL as cover_ofset_forms\n  FROM orders o,\n      papers cpp\n  WHERE cpp.id = o.cover_paper\n  AND   cpp.is_empty\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hrywmpcb",
    "name": "cover_sheets",
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
    "id": "ydrz11v6",
    "name": "cover_print_sheets",
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
    "id": "zzwqfels",
    "name": "cover_product_column_height",
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
    "id": "hrunksmy",
    "name": "cover_ofset_forms",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("voflwpeb")

  // remove
  collection.schema.removeField("8fnwu46m")

  // remove
  collection.schema.removeField("dtbepv2e")

  // remove
  collection.schema.removeField("opeu5jbk")

  // remove
  collection.schema.removeField("gcrtx2z7")

  return dao.saveCollection(collection)
})
