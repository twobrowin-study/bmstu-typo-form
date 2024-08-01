/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nc2oqtde3xud0pp",
    "created": "2024-08-01 23:17:13.096Z",
    "updated": "2024-08-01 23:17:13.096Z",
    "name": "report_fields_block_printers_outgo",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ajiee3fw",
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
        "id": "t6kx4kcd",
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
        "id": "krytere9",
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
        "id": "vtknauwq",
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
        "id": "cm0jbukd",
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
        "id": "abvacadk",
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
        "id": "ygcjxza6",
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
        "id": "efgwcpam",
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
      "query": "SELECT\n  id,\n  order_id,\n  section_id,\n  \"order\",\n  \"name\",\n  \"value\",\n  units,\n  rate,\n  cost\nFROM (\n  -- Картридж цифра голубой\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_sheets*bc.print_side_num/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_cyan_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      101 as \"order\",\n      concat('Картридж ', p.name, ': Голубой') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра пурпурный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_sheets*bc.print_side_num/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_magenta_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      102 as \"order\",\n      concat('Картридж ', p.name, ': Пурпурный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра жёлтый\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_sheets*bc.print_side_num/(bp.outgo*1.15) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_yellow_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      103 as \"order\",\n      concat('Картридж ', p.name, ': Жёлтый') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p,\n        colors c\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n    AND   p.is_digital_color\n    AND   c.id = o.block_color\n    AND   c.is_color\n  )\n\n  UNION\n\n  -- Картридж цифра чёрный\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        (CASE\n          WHEN NOT bc.is_color THEN obc.block_sheets*bc.print_side_num/bp.outgo\n          ELSE obc.block_sheets*bc.print_side_num/(bp.outgo*1.15)\n        END) as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_digital_cartridge_black_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      104 as \"order\",\n      concat('Картридж ', p.name, ': Чёрный') as \"name\",\n      round(calc.\"value\"*100, 3) as \"value\",\n      '%' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_digital\n  )\n\n  UNION\n\n  -- Краска ризограф\n  SELECT\n    id,\n    order_id,\n    section_id,\n    \"order\",\n    \"name\",\n    \"value\",\n    units,\n    rate,\n    cost\n  FROM (\n    WITH calc as (\n      SELECT\n        o.id as id,\n        obc.block_sheets*bc.print_side_num/bp.outgo as \"value\"\n      FROM orders o,\n           orders_block_calc obc,\n           colors bc,\n           printers bp\n      WHERE obc.id = o.id\n      AND   bc.id = o.block_color\n      AND   bp.id = o.block_printer\n    )\n    SELECT\n      concat(o.id, '_risograph_outgo') as id,\n      o.id as order_id,\n      '000006_materals' as section_id,\n      104 as \"order\",\n      concat('Краска ', p.name) as \"name\",\n      round(calc.\"value\", 4) as \"value\",\n      'л' as units,\n      p.price as rate,\n      ceiling(calc.\"value\"*p.price) as cost\n    FROM orders o,\n        calc,\n        printers p\n    WHERE calc.id = o.id\n    AND   p.id = o.block_printer\n    AND   p.is_risograph\n  )\n)"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nc2oqtde3xud0pp");

  return dao.deleteCollection(collection);
})
