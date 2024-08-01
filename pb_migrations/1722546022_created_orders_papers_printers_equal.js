/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ke8u2wp3hzhw4yk",
    "created": "2024-08-01 21:00:22.817Z",
    "updated": "2024-08-01 21:00:22.817Z",
    "name": "orders_papers_printers_equal",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hb5vm5sa",
        "name": "papers_equals",
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
        "id": "2ptgyhma",
        "name": "printers_equals",
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
      "query": "SELECT\n    o.id as id,\n    (o.block_paper = o.cover_paper AND obp.block_format = ocp.cover_format) as papers_equals,\n    (o.block_printer = o.cover_printer) as printers_equals\nFROM orders o,\n     orders_block_processed obp, \n     orders_cover_processed ocp\nWHERE obp.id = o.id\nAND   ocp.id = o.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ke8u2wp3hzhw4yk");

  return dao.deleteCollection(collection);
})
