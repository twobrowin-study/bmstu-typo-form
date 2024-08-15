/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xr6qwo12yi35u2i")

  collection.options = {
    "query": "SELECT\n  id,\n\n  -- Количество изделий на лист\n  cover_multiplicity,\n\n  -- Формат используемого листа\n  cover_format,\n\n  -- Цена за бумагу обложки\n  cover_paper_price,\n\n  -- Формат прозрачной обложки и подложки\n  transparent_elements_format,\n\n  -- Скорость ламинации листа\n  lamintaion_work_speed\nFROM (\n  -- Брошюра: Задано крепление\n  SELECT\n    o.id as id,\n    cfr.multiplicity*1.0 as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format,\n    pp.price as cover_paper_price,\n    cfr.format_wo_departure_elements as transparent_elements_format,\n    cfr.lamintaion_work_speed*1.0 as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fastening) as cfr_fastening,\n       paper_prices pp\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fastening.value = o.fastening\n  AND   pp.paper = o.cover_paper\n  AND   (\n    pp.format = cfr.format_w_departure_elements AND o.cover_departure_elements\n    OR\n    pp.format = cfr.format_wo_departure_elements AND NOT o.cover_departure_elements\n  )\n\n  UNION\n\n  -- Листовая продукция: нет крепления, используются правила для блока\n  SELECT\n    o.id as id,\n    bfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN bfr.format_w_departure_elements\n      ELSE bfr.format_wo_departure_elements\n    END) as cover_format,\n    pp.price as cover_paper_price,\n    bfr.format_wo_departure_elements as transparent_elements_format,\n    bfr.lamintaion_work_speed as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       block_format_rules bfr,\n       json_each(bfr.format) as bfr_format,\n       json_each(bfr.printer) as bfr_printer,\n       paper_prices pp\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   bfr_format.value = o.format\n  AND   bfr_printer.value = o.cover_printer\n  AND   pp.paper = o.cover_paper\n  AND   (\n    pp.format = bfr.format_w_departure_elements AND o.cover_departure_elements\n    OR\n    pp.format = bfr.format_wo_departure_elements AND NOT o.cover_departure_elements\n  )\n\n\n  UNION\n\n  -- Нет обложки\n  SELECT\n    o.id as id,\n    NULL as cover_multiplicity,\n    NULL as cover_format,\n    NULL as cover_paper_price,\n    NULL as transparent_elements_format,\n    NULL as lamintaion_work_speed\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // remove
  collection.schema.removeField("0jxoij4t")

  // remove
  collection.schema.removeField("n4pbtkjs")

  // remove
  collection.schema.removeField("hrswul70")

  // remove
  collection.schema.removeField("ziwcssr0")

  // remove
  collection.schema.removeField("lv6aie4f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w4fhohj7",
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
    "id": "h9yodyjn",
    "name": "cover_format",
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
    "id": "waubupvj",
    "name": "cover_paper_price",
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
    "id": "u6hvesqa",
    "name": "transparent_elements_format",
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
    "id": "svslfvvq",
    "name": "lamintaion_work_speed",
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
  const collection = dao.findCollectionByNameOrId("xr6qwo12yi35u2i")

  collection.options = {
    "query": "SELECT\n  id,\n\n  -- Количество изделий на лист\n  cover_multiplicity,\n\n  -- Формат используемого листа\n  cover_format,\n\n  -- Цена за бумагу обложки\n  cover_paper_price,\n\n  -- Формат прозрачной обложки и подложки\n  transparent_elements_format,\n\n  -- Скорость ламинации листа\n  lamintaion_work_speed\nFROM (\n  -- Брошюра: Задано крепление\n  SELECT\n    o.id as id,\n    cfr.multiplicity*1.0 as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format,\n    pp.price as cover_paper_price,\n    cfr.format_wo_departure_elements as transparent_elements_format,\n    cfr.lamintaion_work_speed*1.0 as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fastening) as cfr_fastening,\n       paper_prices pp\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fastening.value = o.fastening\n  AND   pp.paper = o.cover_paper\n  AND   (\n    pp.format = cfr.format_w_departure_elements AND o.cover_departure_elements\n    OR\n    pp.format = cfr.format_wo_departure_elements AND NOT o.cover_departure_elements\n  )\n\n  UNION\n\n  -- Листовая продукция: нет крепления, используется скоба как стандартный вариант\n  SELECT\n    o.id as id,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format,\n    pp.price as cover_paper_price,\n    cfr.format_wo_departure_elements as transparent_elements_format,\n    cfr.lamintaion_work_speed as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fastening) as cfr_fastening,\n       fastenings f,\n       paper_prices pp\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   f.name = \"Скоба\"\n  AND   cfr_fastening.value = f.id\n  AND   pp.paper = o.cover_paper\n  AND   (\n    pp.format = cfr.format_w_departure_elements AND o.cover_departure_elements\n    OR\n    pp.format = cfr.format_wo_departure_elements AND NOT o.cover_departure_elements\n  )\n\n\n  UNION\n\n  -- Нет обложки\n  SELECT\n    o.id as id,\n    NULL as cover_multiplicity,\n    NULL as cover_format,\n    NULL as cover_paper_price,\n    NULL as transparent_elements_format,\n    NULL as lamintaion_work_speed\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0jxoij4t",
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
    "id": "n4pbtkjs",
    "name": "cover_format",
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
    "id": "hrswul70",
    "name": "cover_paper_price",
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
    "id": "ziwcssr0",
    "name": "transparent_elements_format",
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
    "id": "lv6aie4f",
    "name": "lamintaion_work_speed",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("w4fhohj7")

  // remove
  collection.schema.removeField("h9yodyjn")

  // remove
  collection.schema.removeField("waubupvj")

  // remove
  collection.schema.removeField("u6hvesqa")

  // remove
  collection.schema.removeField("svslfvvq")

  return dao.saveCollection(collection)
})
