/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wm1axh9lep4pro4")

  collection.name = "old_report_fields"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wm1axh9lep4pro4")

  collection.name = "report_fields"

  return dao.saveCollection(collection)
})
