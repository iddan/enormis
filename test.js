import Enormis from './index';

let db = new Enormis('mongodb://localhost:27017/impullse');

db.user.find({username: 'iddan'}).then(console.log);