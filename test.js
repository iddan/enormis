const { Client } = require("./enormis");

async function getUsers() {
  const client = await Client("mongodb://localhost:27017");
  const users = await client.test.user.find({});
  client.close();
  return users;
}

getUsers().then(console.log).catch(console.error)
