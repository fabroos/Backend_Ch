const express = require('express')
const webRouter = express.Router()

// Routes
webRouter.get('/products', (req, res) => {
  res.sendFile('index.html', { root: './public' })
})
webRouter.post('/products', (req, res) =>
  res.sendFile('index.html', { root: './public' })
)

module.exports = webRouter
