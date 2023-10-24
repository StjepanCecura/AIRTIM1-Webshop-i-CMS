const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Payment service')
})

app.listen(port, () => {
  console.log(`Payment service on port: ${port}`)
})