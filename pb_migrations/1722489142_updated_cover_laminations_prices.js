/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6ggedhyd6i9up2c")

  collection.name = "cover_laminations_rules"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6ggedhyd6i9up2c")

  collection.name = "cover_laminations_prices"

  return dao.saveCollection(collection)
})
