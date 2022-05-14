const express = require('express')
const webRouter = express.Router()

webRouter.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

module.exports = webRouter
