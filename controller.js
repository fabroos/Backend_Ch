const DB = require('./databaseConstructor.js')

const database = new DB('products.json')

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await database.getAll()
      res.json(data)
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message })
    }
  },
  getById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const data = await database.getById(id)
      res.json(data)
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message })
    }
  },
  create: async (req, res) => {
    try {
      if (!req.body.name || !req.body.price || !req.body.image) {
        let err = new Error('Faltan datos')
        err.status = 400
        throw err
      }
      const object = {
        id: `${Date.now()}`,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
      }
      const data = await database.save(object)
      res.json(data)
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message })
    }
  },
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        let err = new Error('El id debe ser un numero')
        err.status = 400
        throw err
      }
      if (Object.keys(req.body).length === 0) {
        let err = new Error('Faltan datos')
        err.status = 400
        throw err
      }
      let data
      data = await database.getById(id)
      let newInfo = {}
      if (req.body?.name) newInfo.name = req.body.name
      if (req.body?.price) newInfo.price = req.body.price
      if (req.body?.image) newInfo.image = req.body.image
      const newData = await database.update(id, newInfo)
      res.json(newData)
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message })
    }
  },
  deleteById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        let err = new Error('El id debe ser un numero')
        err.status = 400
        throw err
      }
      const data = await database.deleteById(id)
      res.json(data)
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }
}
