# Enormis
## Simple modern MongoDB driver
### Code Example
```js
import Enormis from './index';

let db = new Enormis('mongodb://localhost:27017/test');

db.user.find({}).then(console.log);
```