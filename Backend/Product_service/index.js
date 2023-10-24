const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Product service')
})

app.listen(port, () => {
  console.log(`Product service on port: ${port}`)
})