# Enormis
## Simple modern MongoDB driver
### Motivation
#### Callback Hell
```js
MongoClient.connect(URL).then(db => {
    // ...
});
```
#### Poor Syntax
```js
db.collection(NAME).find(QUERY).toArray().then(res => {
    // ...
});
```
Mongo Shell Inspiration:
```
 $ db.user.find()
```
### Code Example
```js
import Enormis from 'enormis';

let db = new Enormis('mongodb://localhost:27017/test');

db.user.find({}).then(console.log);
```