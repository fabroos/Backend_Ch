import Container from '../Containers/MongoDB.js'
import { normalize } from 'normalizr'
import { messageListSchema, messageSchema } from '../schemas/schemas.js'

const messages = new Container('messages')

const messageController = {
  validateBody: body => {
    if (
      !(
        body.hasOwnProperty('text') &&
        body.hasOwnProperty('author') &&
        Object.keys(body.author).length === 5
      )
    )
      throw new Error('Invalid body')
  },
  createmessage: function (req, res) {
    try {
      messageController.validateBody(req.body)
      const body = req.body

      const list = messages.guardar(body)
      res.status(201).json(list)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  getAllmessages: async function (req, res) {
    try {
      const list = await messages.listarAll()
      const normalized = normalize(list, messageListSchema)
      res.status(200).json(normalized)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  updatemessage: async function (req, res) {
    try {
      const { id } = req.params
      messageController.validateBody(req.body)
      if (Object.keys(newInfo).length === 0) {
        const err = new Error('No se recibieron datos')
        err.status = 400
        throw err
      }
      const res = await messages.actualizar(id, req.body)
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
      res.json(await messages.listar(id))
    } catch (err) {
      throw err
    }
  },
  deletemessage: async function (req, res) {
    try {
      const id = req.params.id
      messageController.validateBody(req.body)
      await messages.borrar(id)
      res.json({ message: 'message eliminado' })
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  clearMessages: async function (req, res) {
    try {
      await messages.borrarAll()
      res.json({ message: 'messages eliminados' })
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  }
}

export { messageController }
