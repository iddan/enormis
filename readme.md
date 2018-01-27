# Enormis

Simple modern MongoDB driver

Use MongoDB like this:

```javascript
const { Client } = require('enormis')

async function getUsers() {
    const client = await Client('mongodb://localhost:27017');
    const users = await client.test.user.find({});
    client.close();
    return users;
}
```

Instead of:

```javascript 
const { MongoClient } = require('mongodb')

async function getUsers() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const users = await client.db('test').collection('user').find({}).toArray();
    client.close();
    return users;
}
```
