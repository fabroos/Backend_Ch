const productCreator = require('../api/productsController')
const products = new productCreator('products.json')

const ProductController = {
  addProduct: function (product) {
    return products.save(product)
  },
  getAllProducts: function () {
    return products.getAll()
  }
}

module.exports = ProductController
