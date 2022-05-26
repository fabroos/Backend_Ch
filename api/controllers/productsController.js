const Container = require('../containers/productsContainer.js')

const DB = new Container('databases/products.json')

const controller = {
  getAll: async (req, res) => {
    try {
      const products = await DB.getAll()
      res.status(200).json(products)
    } catch (e) {
      res.status(e.status || 500).json(e)
    }
  },
  getByID: async (req, res) => {
    try {
      const product = await DB.getByID(req.params.id)
      res.status(200).json(product)
    } catch (e) {
      res.status(e.status || 500).json(e.message)
    }
  },
  create: async (req, res) => {
    try {
      const { title, img, price } = req.body
      if (!title || !img || !price) {
        const error = new Error('Missing required fields')
        error.status = 400
        throw error
      }
      const product = await DB.create({ title, img, price })
      res.status(201).json(product)
    } catch (e) {
      res.status(e.status || 500).json(e.message)
    }
  },
  update: async (req, res) => {
    try {
      const { title, img, price } = req.body
      if (!title && !img && !price) {
        const error = new Error('Missing required fields')
        error.status = 400
        throw error
      }
      const product = await DB.update(req.params.id, { title, img, price })
      res.status(200).json(product)
    } catch (e) {
      res.status(e.status || 500).json(e.message)
    }
  },
  delete: async (req, res) => {
    try {
      await DB.delete(req.params.id)
      res.status(204).end()
    } catch (e) {
      res.status(e.status || 500).json(e.message)
    }
  }
}

module.exports = controller
