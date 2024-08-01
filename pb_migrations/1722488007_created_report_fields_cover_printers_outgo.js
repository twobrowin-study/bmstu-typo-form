/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "69qwy7izdvs351n",
    "created": "2024-08-01 04:53:27.554Z",
    "updated": "2024-08-01 04:53:27.554Z",
    "name": "report_fields_cover_printers_outgo",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lnjfhtsx",
        "name": "order_id",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "enrrkevf",
        "name": "section_id",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "dbfjqybl",
        "name": "order",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "hybsbfng",
        "name": "name",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "omgeotf8",
        "name": "value",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "vblcj8or",
        "name": "units",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "iwbhnwxz",
        "name": "rate",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "uulqghnp",
        "name": "cost",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Картридж цифра голубой\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        occ.cover_sheets*cc.print_side_num/cp.outgo as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_cyan_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101 as \"order\",\n      concat('Картридж ', p.name, ': Голубой') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.cover_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра пурпурный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        occ.cover_sheets*cc.print_side_num/cp.outgo as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_magenta_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Картридж ', p.name, ': Пурпурный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.cover_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра жёлтый\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        occ.cover_sheets*cc.print_side_num/cp.outgo as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_yellow_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      103 as \"order\",\n      concat('Картридж ', p.name, ': Жёлтый') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.cover_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра чёрный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        occ.cover_sheets*cc.print_side_num/cp.outgo as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      104 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Краска ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        occ.cover_sheets*cc.print_side_num/cp.outgo as \"value\"\n      FROM orders o,\n           orders_cover_calc occ,\n           colors cc,\n           printers cp\n      WHERE occ.id = o.id\n      AND   cc.id = o.cover_color\n      AND   cp.id = o.cover_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      104 as \"order\",\n      concat('Краска ', p.name) as \"name\",\n      round(calc.\"value\", 4) as \"value\",\n      'л' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.cover_printer\n    AND   p.is_risograph\n  )\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("69qwy7izdvs351n");

  return dao.deleteCollection(collection);
})
