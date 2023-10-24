const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('User service')
})

app.listen(port, () => {
  console.log(`User service on port: ${port}`)
})