const express = require('express')
const webRouter = express.Router()

webRouter.get('/', (req, res) => {
  res.render('products', {
    products: [{ title: 'Regla' }]
  })
})

module.exports = webRouter
