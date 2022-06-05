import { Container } from '../api/Container.js'
import { getConfig } from '../knexConfig.js'
import { messageSchema } from '../schemas.js'

const messages = new Container(getConfig('sqlite3'), 'messages', messageSchema)
await messages.init()

const messageController = {
  validateId (id) {
    if (isNaN(parseInt(id))) {
      const err = new Error('El id debe ser un numero')
      err.status = 400
      throw err
    }
  },
  createmessage: function (req, res) {
    try {
      const { email, message } = req.body
      if (!email || !message) {
        const err = new Error('Faltan datos')
        err.status = 400
        throw err
      }
      const list = messages.save({ email, message })
      res.status(201).json(list)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  getAllmessages: async function (req, res) {
    try {
      const list = await messages.getAll()
      res.json(list)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  updatemessage: async function (req, res) {
    try {
      const { id } = req.params
      messageController.validateId(id)
      const { email, message } = req.body
      if (!email && !message) {
        const err = new Error('Faltan datos')
        err.status = 400
        throw err
      }
      const newInfo = {}
      if (email) newInfo.email = email
      if (message) newInfo.message = message
      if (Object.keys(newInfo).length === 0) {
        const err = new Error('No se recibieron datos')
        err.status = 400
        throw err
      }
      const res = await messages.update(req.params.id, newInfo)
      res.json(res)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  getmessageById: async function (req, res) {
    try {
      const id = req.params.id
      messageController.validateId(id)
      res.json(await messages.getById(id))
    } catch (err) {
      throw err
    }
  },
  deletemessage: async function (req, res) {
    try {
      const id = req.params.id
      console.log(this.validateId)
      messageController.validateId(id)
      await messages.deleteById(id)
      res.json({ message: 'messageo eliminado' })
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  getTimestamp: function () {
    return new Date().toISOString()
  }
}

export { messageController }
