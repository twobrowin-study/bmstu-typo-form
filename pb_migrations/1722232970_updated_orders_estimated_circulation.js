/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5pa62hhs3hdp93d")

  collection.options = {
    "query": "SELECT\n    id,\n    estimated_circulation\nFROM (\n    SELECT\n        o.id as id,\n        (CASE\n            WHEN NOT cp.is_ofset THEN ceiling(o.circulation*1.06+6)\n            ELSE ceiling(o.circulation*1.06 + cc.ofset_from_num*40)\n        END) as estimated_circulation\n    FROM orders o,\n        order_types ot,\n        printers cp,\n        colors cc\n    WHERE ot.id = o.type\n    AND   NOT ot.has_block\n    AND   cp.id = o.cover_printer\n    AND   cc.id = o.cover_color\n\n    UNION\n\n    SELECT\n        o.id as id,\n        (CASE\n            WHEN NOT cp.is_ofset AND NOT bp.is_ofset THEN ceiling(o.circulation*1.06+6)\n            WHEN     cp.is_ofset AND NOT bp.is_ofset THEN ceiling(o.circulation*1.06 + cc.ofset_from_num*40)\n            WHEN NOT cp.is_ofset AND     bp.is_ofset THEN ceiling(o.circulation*1.06 + bc.ofset_from_num*40)\n            ELSE ceiling(o.circulation*1.06 + (cc.ofset_from_num + bc.ofset_from_num)*40)\n        END) as estimated_circulation\n    FROM orders o,\n        order_types ot,\n        printers cp,\n        colors cc,\n        printers bp,\n        colors bc\n    WHERE ot.id = o.type\n    AND   ot.has_block\n    AND   cp.id = o.cover_printer\n    AND   cc.id = o.cover_color\n    AND   bp.id = o.block_printer\n    AND   bc.id = o.block_color\n)\n\n"
  }

  // remove
  collection.schema.removeField("whbpycuh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hbjnecxw",
    "name": "estimated_circulation",
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
  const collection = dao.findCollectionByNameOrId("5pa62hhs3hdp93d")

  collection.options = {
    "query": "SELECT\n    id,\n    estimated_circulation\nFROM (\n    SELECT\n        o.id as id,\n        (CASE\n            WHEN NOT cp.is_ofset THEN ceiling(o.circulation*1.06+6)\n            ELSE ceiling(o.circulation*1.06 + cc.ofset_from_num*40)\n        END) as estimated_circulation\n    FROM orders o,\n        order_types ot,\n        printers cp,\n        colors cc\n    WHERE ot.id = o.type\n    AND   NOT ot.has_block\n    AND   cp.id = o.cover_printer\n    AND   cc.id = o.cover_color\n\n    UNION\n\n    SELECT\n        o.id as id,\n        (CASE\n            WHEN NOT cp.is_ofset AND NOT bp.is_ofset THEN ceiling(o.circulation*1.06+6)\n            ELSE ceiling(o.circulation*1.06 + (cc.ofset_from_num + bc.ofset_from_num)*40)\n        END) as estimated_circulation\n    FROM orders o,\n        order_types ot,\n        printers cp,\n        colors cc,\n        printers bp,\n        colors bc\n    WHERE ot.id = o.type\n    AND   ot.has_block\n    AND   cp.id = o.cover_printer\n    AND   cc.id = o.cover_color\n    AND   bp.id = o.block_printer\n    AND   bc.id = o.block_color\n)\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whbpycuh",
    "name": "estimated_circulation",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("hbjnecxw")

  return dao.saveCollection(collection)
})
