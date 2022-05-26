const Container = require('../containers/cartsContainer.js')

const carts = new Container('./databases/carts.json')

const controller = {
  createCart: async (req, res) => {
    try {
      const id = await carts.createCart()
      res.status(201).json({ id })
    } catch (e) {
      res.status(500).json(e.message)
    }
  },
  createProduct: async (req, res) => {
    try {
      const { id } = req.params
      const { product } = req.body
      if (!product) {
        const error = new Error('Field product is required')
        error.status = 400
        throw error
      }
      const cart = await carts.saveAProduct(id, product)
      res.status(201).json(cart)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },
  getCart: async (req, res) => {
    try {
      const { id } = req.params
      const cart = await carts.getByID(id)
      res.status(200).json(cart)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { cartId, productId } = req.params
      const cart = await carts.deleteProduct(cartId, productId)
      res.status(200).json(cart)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },
  clearCart: async (req, res) => {
    try {
      const { id } = req.params
      const cart = await carts.clearCart(id)
      res.status(200).json(cart)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = controller
