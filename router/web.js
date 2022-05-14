const express = require('express')
const webRouter = express.Router()
const database = require('../api/databaseConstructor.js')

const DB = new database('products.json')

webRouter.get('/products', async (req, res) => {
  const data = {
    products: await DB.getAll(),
    title: 'Products'
  }
  res.render('products', data)
})

webRouter.get('/add', (req, res) => {
  const data = {
    title: 'Add product',
    method: 'post',
    postUrl: 'http://localhost:8080/products'
  }
  res.render('form', data)
})

webRouter.post('/products', async (req, res) => {
  console.log(req.body)
  const data = {
    title: req.body.title,
    price: req.body.price,
    image: req.body.image
  }
  await DB.save(data)
  res.redirect('/add')
})

module.exports = webRouter
