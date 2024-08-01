/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xr6qwo12yi35u2i")

  collection.options = {
    "query": "SELECT\n  id,\n\n  -- Количество изделий на лист\n  cover_multiplicity,\n\n  -- Формат используемого листа\n  cover_format,\n\n  -- Скорость ламинации листа\n  lamintaion_work_speed\nFROM (\n  -- Брошюра: Задано крепление\n  SELECT\n    o.id as id,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format,\n    cfr.lamintaion_work_speed as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fastening) as cfr_fastening\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fastening.value = o.fastening\n\n  UNION\n\n  -- Листовая продукция: нет крепления, используется скоба как стандартный вариант\n  SELECT\n    o.id as id,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format,\n    cfr.lamintaion_work_speed as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fastening) as cfr_fastening,\n       fastenings f\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   f.name = \"Скоба\"\n  AND   cfr_fastening.value = f.id\n\n  UNION\n\n  -- Нет обложки\n  SELECT\n    o.id as id,\n    NULL as cover_multiplicity,\n    NULL as cover_format,\n    NULL as lamintaion_work_speed\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // remove
  collection.schema.removeField("j8we6rrh")

  // remove
  collection.schema.removeField("88emwkbz")

  // remove
  collection.schema.removeField("ogen2vnz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ihrw6bhd",
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
    "id": "2fyvjzrj",
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
    "id": "ouk5bcvi",
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
    "query": "SELECT\n  id,\n  cover_multiplicity,\n  cover_format,\n  lamintaion_work_speed\nFROM (\n  SELECT\n    o.id as id,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format,\n    cfr.lamintaion_work_speed as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fastening) as cfr_fastening\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   cfr_fastening.value = o.fastening\n\n  UNION\n\n  SELECT\n    o.id as id,\n    cfr.multiplicity as cover_multiplicity,\n    (CASE\n      WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n      ELSE cfr.format_wo_departure_elements\n    END) as cover_format,\n    cfr.lamintaion_work_speed as lamintaion_work_speed\n  FROM orders o,\n       order_types ot,\n       papers cover_papers,\n       cover_format_rules cfr,\n       json_each(cfr.format) as cfr_format,\n       json_each(cfr.printer) as cfr_printer,\n       json_each(cfr.fastening) as cfr_fastening,\n       fastenings f\n  WHERE cover_papers.id = o.cover_paper\n  AND   ot.id = o.type\n  AND   NOT ot.has_fastening\n  AND   NOT cover_papers.is_empty\n  AND   cfr_format.value = o.format\n  AND   cfr_printer.value = o.cover_printer\n  AND   f.name = \"Скоба\"\n  AND   cfr_fastening.value = f.id\n\n  UNION\n\n  SELECT\n    o.id as id,\n    NULL as cover_multiplicity,\n    NULL as cover_format,\n    NULL as lamintaion_work_speed\n  FROM orders o,\n       papers cover_papers\n  WHERE cover_papers.id = o.cover_paper\n  AND   cover_papers.is_empty\n)\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j8we6rrh",
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
    "id": "88emwkbz",
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
    "id": "ogen2vnz",
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
  collection.schema.removeField("ihrw6bhd")

  // remove
  collection.schema.removeField("2fyvjzrj")

  // remove
  collection.schema.removeField("ouk5bcvi")

  return dao.saveCollection(collection)
})
