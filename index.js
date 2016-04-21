import {MongoClient} from 'mongodb';
import deasync from 'deasync';

function exec () {
    let apply = this.collection.native[this.method].apply(this.collection.native, [].slice.call(arguments));
    if (apply.toArray)
        return apply.toArray();
    else 
        return apply;
}

class Collection {
    constructor (name, db) {
        this.name = name;
        this.native = db.native.collection(name);
        this.db = db;
        let methods = [];
        for (let key in this.native)
            if (typeof this.native[key] == 'function')
                methods.push(key);
        methods.forEach(method => {
            this[method] = exec.bind({collection: this, method: method});
        });
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