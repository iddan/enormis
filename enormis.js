const { MongoClient }  = require('mongodb')

/**
 * Simulates db.collectionName
 * @param {Db} native 
 * @returns {Promise<Db>}
 */
const Database = (native) => new Proxy(native, {
  get(target, name) {
    if (name in target) {
      return target[name]
    }
    return target.collection(name)
  }
})

/**
 * Simulates client.dbName
 * @param {string} uri
 * @param {MongoClientOptions} [options]
 * @returns {Promise<MongoClient>}
 */
exports.Client = (...args) => MongoClient.connect(...args).then(client => new Proxy(client, {
  get(target, name) {
    if (name in target) {
      return target[name];
    }
    return Database(target.db(name));
  }
}))
