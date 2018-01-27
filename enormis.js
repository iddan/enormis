const { MongoClient, Cursor } = require("mongodb");

function applyToArray(onFullfil, onReject) {
  const arrayPromise = this.toArray()
  if (onReject) {
    return arrayPromise.then(onFullfil, onReject)
  }
  return arrayPromise.then(onFullfil)
}

const collectionMethodProxyDescriptor = {
  apply(method, thisArg, argumentsList) {
    const value = method.apply(thisArg, argumentsList);
    if (value instanceof Cursor) {
      value.then = applyToArray
    }
    return value
  }
}

const collectionProxyDescriptor = {
  get(target, name) {
    const property = target[name]
    if (typeof property !== 'function') {
      return property
    }
    return new Proxy(property, collectionMethodProxyDescriptor);
  }
}

const Collection = native =>
  new Proxy(native, collectionProxyDescriptor);




const databaseProxyDescriptor = {
  get(target, name) {
    if (name in target) {
      return target[name];
    }
    return Collection(target.collection(name));
  }
}

/**
 * Simulates db.collectionName
 * @param {Db} native
 * @returns {Promise<Db>}
 */
const Database = native =>
  new Proxy(native, databaseProxyDescriptor);



const clientProxyDescriptor = {
  get(target, name) {
    if (name in target) {
      return target[name];
    }
    return Database(target.db(name));
  }
}

/**
 * Simulates client.dbName
 * @param {string} uri
 * @param {MongoClientOptions} [options]
 * @returns {Promise<MongoClient>}
 */
exports.Client = (...args) =>
  MongoClient.connect(...args).then(
    client =>
      new Proxy(client, clientProxyDescriptor)
  );
