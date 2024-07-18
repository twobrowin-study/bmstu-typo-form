/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "38pm2ksdvz3qk6t",
    "created": "2024-07-16 20:33:51.388Z",
    "updated": "2024-07-16 20:33:51.388Z",
    "name": "orders_block_calc",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zvnhsz4y",
        "name": "block_sides",
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
        "id": "eegr9x23",
        "name": "block_sheets",
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
      "query": "SELECT\n  o.id as id,\n  ceiling(o.page_num/obp.block_multiplicity) as block_sides,\n  ceiling(o.page_num/(obp.block_multiplicity*bc.print_side_num)) as block_sheets\nFROM orders o,\n     orders_estimated_circulation oec,\n     orders_block_processed obp,\n     colors bc\nWHERE oec.id = o.id\nAND   obp.id = o.id\nAND   bc.id = o.block_color"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("38pm2ksdvz3qk6t");

  return dao.deleteCollection(collection);
})
