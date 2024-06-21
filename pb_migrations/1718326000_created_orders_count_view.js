/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xd3hvu20iithlaq",
    "created": "2024-06-14 00:46:40.631Z",
    "updated": "2024-06-14 00:46:40.631Z",
    "name": "orders_count_view",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xkz3muhi",
        "name": "estimated_circulation",
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
        "id": "j4l2dj4m",
        "name": "block_paper_outgo",
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
      "query": "WITH pre_calc as (\n  SELECT\n    o.id as id,\n    ceiling(o.circulation*1.06+6) as estimated_circulation\nFROM orders o\n)\nSELECT \n  o.id as id,\n  pc.estimated_circulation as estimated_circulation,\n  ceiling((o.page_num*pc.estimated_circulation)/(2*o.block_multiplicity)) as block_paper_outgo\nFROM orders o, pre_calc pc\nWHERE o.id = pc.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xd3hvu20iithlaq");

  return dao.deleteCollection(collection);
})
