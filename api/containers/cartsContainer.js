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
  async createCart () {
    try {
      const data = await this.getAll()
      console.log('data', data)
      const id = `${Date.now()}`
      const newCart = {
        id,
        products: []
      }
      data.push(newCart)
      await fs.promises.writeFile(this.path, JSON.stringify(data))
      return id
    } catch (e) {
      // const error = new Error('Error creating cart')
      // error.status = 500
      throw e
    }
  }
  async saveAProduct (id, product) {
    try {
      const carts = await this.getAll()
      const cartIndex = carts.findIndex(cart => cart.id === id)
      if (cartIndex === -1) {
        const error = new Error('Cart not found')
        error.status = 404
        throw error
      }
      console.log('product', product)
      carts[cartIndex].products.push(product)
      await fs.promises.writeFile(this.path, JSON.stringify(carts))
      return carts[cartIndex]
    } catch (e) {
      throw e
    }
  }
  async getByID (id) {
    try {
      const carts = await this.getAll()
      const cart = carts.find(cart => cart.id === id)
      if (!cart) {
        const error = new Error('Cart not found')
        error.status = 404
        throw error
      }
      return cart.products
    } catch (e) {
      throw e
    }
  }
  async clearCart (id) {
    try {
      const carts = await this.getAll()
      const cartIndex = carts.findIndex(cart => cart.id === id)
      if (cartIndex === -1) {
        const error = new Error('Cart not found')
        error.status = 404
        throw error
      }
      carts[cartIndex].products = []
      await fs.promises.writeFile(this.path, JSON.stringify(carts))
      return carts[cartIndex].id
    } catch (e) {
      const error = new Error('Something went wrong')
      error.status = 500
      throw error
    }
  }
  async deleteProduct (cartId, productId) {
    try {
      const carts = await this.getAll()
      const cartIndex = carts.findIndex(cart => cart.id === cartId)
      if (cartIndex === -1) {
        const error = new Error('Cart not found')
        error.status = 404
        throw error
      }
      const productIndex = carts[cartIndex].products.findIndex(
        product => product.id === productId
      )
      if (productIndex === -1) {
        const error = new Error('Product not found')
        error.status = 404
        throw error
      }
      carts[cartIndex].products.splice(productIndex, 1)
      await fs.promises.writeFile(this.path, JSON.stringify(carts))
      return carts[cartIndex]
    } catch (e) {
      throw e
    }
  }
}

module.exports = container
