const { Client } = require('./enormis')

;(async function() {
  const client = await Client('mongodb://localhost:27017')
  const users = await client.test.user.find({}).toArray()
  console.log(users)
})()
