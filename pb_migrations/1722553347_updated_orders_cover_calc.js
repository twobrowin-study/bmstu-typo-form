/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s57yyb0fdj96zxf")

  collection.options = {
    "query": "SELECT\n  id,\n  cover_sheets,\n  cover_print_sheets,\n  cover_product_column_height,\n  cover_ofset_forms\nFROM (\n  SELECT\n    o.id as id,\n    \n    -- Количество листов, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation/ocp.cover_multiplicity) as cover_sheets,\n    \n    -- Количество сторон печати, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation*cc.print_side_num/ocp.cover_multiplicity) as cover_print_sheets,\n\n    -- Высота столба итоговой продукции обложки или листовой продукции\n    round(ceiling(oec.estimated_circulation/ocp.cover_multiplicity)*cpp.thickness, 2) as cover_product_column_height,\n\n    -- Количество форм офсета, требуемых на обложку или листовую печать\n    (CASE\n      WHEN cp.is_ofset THEN cc.ofset_from_num + 1\n      ELSE NULL\n    END) as cover_ofset_forms\n  FROM orders o,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc,\n      printers cp,\n      papers cpp\n  WHERE oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n  AND   cp.id = o.cover_printer\n  AND   cpp.id = o.cover_paper\n  AND   NOT cpp.is_empty\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_sheets,\n    NULL as cover_print_sheets,\n    NULL as cover_product_column_height,\n    NULL as cover_ofset_forms\n  FROM orders o,\n      papers cpp\n  WHERE cpp.id = o.cover_paper\n  AND   cpp.is_empty\n)"
  }

  // remove
  collection.schema.removeField("lbuoxnsp")

  // remove
  collection.schema.removeField("d7yeoocz")

  // remove
  collection.schema.removeField("fubu6aiq")

  // remove
  collection.schema.removeField("x89bozmi")

  // remove
  collection.schema.removeField("l6eehesk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vpmkcgww",
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
    "id": "mqrlr9v5",
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
    "id": "5rphajdn",
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
    "id": "lw0cgl85",
    "name": "cover_ofset_forms",
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
    "query": "SELECT\n  id,\n  cover_sheets,\n  cover_print_sheets,\n  cover_product_column_height,\n  cover_ofset_forms,\n  risograph_master_films\nFROM (\n  SELECT\n    o.id as id,\n    \n    -- Количество листов, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation/ocp.cover_multiplicity) as cover_sheets,\n    \n    -- Количество сторон печати, требуемых на обложку или листовую продукции\n    ceiling(oec.estimated_circulation*cc.print_side_num/ocp.cover_multiplicity) as cover_print_sheets,\n\n    -- Высота столба итоговой продукции обложки или листовой продукции\n    round(ceiling(oec.estimated_circulation/ocp.cover_multiplicity)*cpp.thickness, 2) as cover_product_column_height,\n\n    -- Количество форм офсета, требуемых на обложку или листовую печать\n    (CASE\n      WHEN cp.is_ofset THEN cc.ofset_from_num + 1\n      ELSE NULL\n    END) as cover_ofset_forms,\n\n    -- Количество мастер плёнок ризографа, требуемых на обложку или листовую печать\n    (CASE\n      WHEN cp.is_risograph THEN cc.risograph_master_films + 1\n      ELSE NULL\n    END) as risograph_master_films\n  FROM orders o,\n      orders_estimated_circulation oec,\n      orders_cover_processed ocp,\n      colors cc,\n      printers cp,\n      papers cpp\n  WHERE oec.id = o.id\n  AND   ocp.id = o.id\n  AND   cc.id = o.cover_color\n  AND   cp.id = o.cover_printer\n  AND   cpp.id = o.cover_paper\n  AND   NOT cpp.is_empty\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_sheets,\n    NULL as cover_print_sheets,\n    NULL as cover_product_column_height,\n    NULL as cover_ofset_forms,\n    NULL as risograph_master_films\n  FROM orders o,\n      papers cpp\n  WHERE cpp.id = o.cover_paper\n  AND   cpp.is_empty\n)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lbuoxnsp",
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
    "id": "d7yeoocz",
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
    "id": "fubu6aiq",
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
    "id": "x89bozmi",
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
    "id": "l6eehesk",
    "name": "risograph_master_films",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("vpmkcgww")

  // remove
  collection.schema.removeField("mqrlr9v5")

  // remove
  collection.schema.removeField("5rphajdn")

  // remove
  collection.schema.removeField("lw0cgl85")

  return dao.saveCollection(collection)
})
