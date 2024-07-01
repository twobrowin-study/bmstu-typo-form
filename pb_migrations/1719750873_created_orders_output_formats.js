/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ipm51j9auiamr0f",
    "created": "2024-06-30 12:34:33.412Z",
    "updated": "2024-06-30 12:34:33.412Z",
    "name": "orders_output_formats",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fvyhkdbp",
        "name": "block_multiplicity",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "tfwnzmwe",
        "name": "block_format",
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
        "id": "bxgzfpgs",
        "name": "cover_multiplicity",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "tyszjoad",
        "name": "cover_format",
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
      "query": "SELECT\n  o.id as id,\n  bfr.multiplicity as block_multiplicity,\n  (CASE\n    WHEN o.block_departure_elements THEN bfr.format_w_departure_elements\n    ELSE bfr.format_wo_departure_elements\n  END) as block_format,\n  cfr.multiplicity as cover_multiplicity,\n  (CASE\n    WHEN o.cover_departure_elements THEN cfr.format_w_departure_elements\n    ELSE cfr.format_wo_departure_elements\n  END) as cover_format\nFROM orders o,\n     block_format_rules bfr,\n     cover_format_rules cfr\nWHERE bfr.format = o.block_format\nAND   cfr.format = o.cover_format\nAND   cfr.fasterning = o.fastening"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ipm51j9auiamr0f");

  return dao.deleteCollection(collection);
})
