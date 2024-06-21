/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "oirv0e6qvbfq8z8",
    "created": "2024-06-17 00:42:41.642Z",
    "updated": "2024-06-17 00:42:41.642Z",
    "name": "orders_works",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uabqaozk",
        "name": "block_risograph_works",
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
        "id": "dgzabs9s",
        "name": "block_digital_works",
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
      "query": "WITH calc AS (\n  SELECT\n    o.id as id,\n    block_printers.is_digital as is_block_printer_digital,\n    block_printers.is_risograph as is_block_printer_risograph\n  FROM orders o,\n       printers block_printers\n  WHERE block_printers.id = o.block_printer\n)\nSELECT\n  o.id as id,\n  (CASE\n    WHEN calc.is_block_printer_risograph THEN (oec.estimated_circulation*o.page_num/o.block_multiplicity)/5000 + (oec.estimated_circulation/o.block_multiplicity)*0.03333\n    ELSE NULL\n  END) as block_risograph_works,\n  (CASE\n    WHEN calc.is_block_printer_digital THEN (oec.estimated_circulation*o.page_num/(2*o.block_multiplicity))/2300 + (0.01*oec.estimated_circulation/(2*o.block_multiplicity))\n    ELSE NULL\n  END) as block_digital_works\nFROM orders o,\n     orders_estimated_circulations oec,\n     calc\nWHERE o.id = oec.id AND o.id = calc.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("oirv0e6qvbfq8z8");

  return dao.deleteCollection(collection);
})
