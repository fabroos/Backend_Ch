// Imports
const express = require('express')
const fs = require('fs/promises')
const Productos = require('./ProductsContainer.js')

// Products
const productos = new Productos('./database/productos.json')
const app = express()
const port = 8080

// Initialize server
const server = app.listen(port, () => {
  console.log('Servidor escuchando en el puerto', port)
})

// Controller
const productsController = {
  async getAll (req, res) {
    const allProducts = await productos.getAll()
    await res.json(allProducts)
  },
  async getRandom (req, res) {
    const productRandom = await productos.getRandom()
    await res.json(productRandom)
  }
}

// Breakpoints
app.get('/productos', productsController.getAll)
app.get('/producto', productsController.getRandom)
