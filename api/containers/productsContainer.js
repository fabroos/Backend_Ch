const fs = require('fs')

class container {
  constructor (path) {
    this.path = path
  }
  async getAll () {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8')
      return JSON.parse(data)
    } catch (e) {
      const error = new Error('Error reading file')
      error.status = 500
      throw error
    }
  }
  async getByID (id) {
    try {
      const products = await this.getAll()
      console.log(products)
      const product = products.find(product => product.id === id)
      if (!product) {
        const error = new Error('Product not found')
        error.status = 404
        throw error
      }
      return product
    } catch (e) {
      throw e
    }
  }
  async create (product) {
    try {
      const products = await this.getAll()
      const newProduct = {
        id: `${Date.now()}`,
        ...product
      }
      products.push(newProduct)
      await fs.promises.writeFile(this.path, JSON.stringify(products))
      return newProduct
    } catch (e) {
      const error = new Error('Something went wrong')
      error.status = 500
      throw error
    }
  }
  async update (id, product) {
    try {
      const products = await this.getAll()
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex === -1) {
        const error = new Error('Product not found')
        error.status = 404
        throw error
      }
      const { title, img, price } = product
      let newProduct = {
        ...products[productIndex]
      }
      if (title) {
        newProduct.title = title
      }
      if (img) {
        newProduct.img = img
      }
      if (price) {
        newProduct.price = price
      }
      products[productIndex] = {
        ...products[productIndex],
        ...newProduct
      }
      await fs.promises.writeFile(this.path, JSON.stringify(products))
      return products[productIndex]
    } catch (e) {
      throw e
    }
  }
  async delete (id) {
    try {
      const products = await this.getAll()
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex === -1) {
        const error = new Error('Product not found')
        error.status = 404
        throw error
      }
      products.splice(productIndex, 1)
      await fs.promises.writeFile(this.path, JSON.stringify(products))
      return products
    } catch (e) {
      throw e
    }
  }
}

module.exports = container
