const { Client } = require("./enormis");

async function findUsers() {
  const client = await Client("mongodb://localhost:27017");
  const users = await client.test.user.find({});
  client.close();
  return users;
}

async function aggregateUsers() {
  const client = await Client('mongodb://localhost:27017')
  const users = await client.test.user.aggregate([
    { $match: {} }
  ])
  client.close();
  return users;
}

findUsers().then(console.log).catch(console.error)
aggregateUsers().then(console.log).catch(console.error)
