const DB = require('./databaseConstructor.js')

const database = new DB('products.json')

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await database.getAll()
      res.send(data)
    } catch (err) {
      res.status(500).send(err)
    }
  },
  getById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const data = await database.getById(id)
      res.send(data)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  create: async (req, res) => {
    try {
      if (!req.body.name || !req.body.price || !req.body.image)
        throw new Error('Faltan datos')
      const object = {
        id: (await database.getLastId()) + 1,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
      }
      const data = await database.save(object)
      res.send(data)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) throw new Error('El id debe ser un número')
      if (Object.keys(req.body).length === 0)
        throw new Error('No hay datos para actualizar')
      let data
      data = await database.getById(id)
      let newInfo = {}
      if (req.body?.name) newInfo.name = req.body.name
      if (req.body?.price) newInfo.price = req.body.price
      if (req.body?.image) newInfo.image = req.body.image
      const newData = await database.update(id, newInfo)
      res.send(newData)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  deleteById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) throw new Error('El id debe ser un número')
      const data = await database.deleteById(id)
      res.send(data)
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
}
