import {MongoClient} from 'mongodb';
import deasync from 'deasync';

class Collection {
    constructor (name, db) {
        this.name = name;
        this.native = db.native.collection(name);
        this.db = db;
    }
    find (query) {
        return this.native.find(query).toArray();
    }
    findOne (query) {
        return this.native.findOne(query);
    }
    insertMany (array) {
        return this.native.insertMany(array);
    }
    insertOne (doc) {
        return this.native.insertOne(doc);
    }
}

class Enormis {
    constructor (url) {
        this.native = deasync(MongoClient.connect)(url);
        this.refresh();
    }
    refresh () {
        let cursor = this.native.listCollections();
        this.collections = deasync(cursor.toArray.bind(cursor))().map(collection => {
            collection = collection.name;
            this[collection] = new Collection(collection, this);
            return collection;
        });
    }
}

export default Enormis;