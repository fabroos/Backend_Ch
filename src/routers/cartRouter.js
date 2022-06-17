import { Router } from 'express'
import { getDao } from '../daos/CRUDS/index.js'

const cartsDao = await getDao({
  collectionName: 'cart',
  filePath: './DB/'
})

const cartsRouter = Router()

const controller = {
  all: async (req, res) => {
    try {
      const products = await cartsDao.listarAll()
      if (products.length === 0) {
        res.status(404).json({ message: 'No hay carritos' })
      } else {
        res.status(200).json(products)
      }
    } catch (err) {
      res.status(err.status || 500).json({
        error: err,
        status: 500
      })
    }
  },
  getOne: async (req, res) => {
    try {
      const product = await cartsDao.listar(req.params.id)
      if (!product) {
        res.status(404).json({ message: 'No existe el carrito' })
      } else {
        res.status(200).json(product)
      }
    } catch (err) {
      const errStatus = err.status || 500
      res.status(errStatus).json({
        message: err.message,
        status: errStatus
      })
    }
  },
  save: async (req, res) => {
    try {
      const prodAgregado = await cartsDao.guardar({ products: [] })
      res.json(prodAgregado)
    } catch (err) {
      res.status(err.status || 500).json({
        error: err,
        status: 500
      })
    }
  },
  update: async (req, res) => {
    try {
      const { productId, quantity } = req.body
      if (!productId) {
        return res.status(400).json({ message: 'Faltan datos' })
      }
      const cart = await cartsDao.listar(req.params.id)
      if (!cart) {
        return res.status(404).json({ message: 'No existe el carrito' })
      }

      const newCart = [...cart.products]
      const productIndex = cart.products.findIndex(
        product => product.productId === productId
      )
      if (productIndex !== -1) {
        newCart[productIndex].quantity += quantity || 1
      } else {
        newCart.push({
          productId,
          quantity: quantity || 1
        })
      }
      const cartActualizado = await cartsDao.actualizar(
        { products: newCart },
        req.params.id
      )
      res.json(cartActualizado)
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500
      })
    }
  },
  delete: async (req, res) => {
    try {
      const state = await cartsDao.borrar(req.params.id)
      if (!state) {
        return res.status(404).json({ message: 'No existe el carrito' })
      }
      res.json({ message: 'carrito eliminado' })
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500
      })
    }
  },
  clear: async (req, res) => {
    try {
      await cartsDao.borrarAll()
      res.json({ message: 'carritos eliminados' })
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500
      })
    }
  }
}

cartsRouter.get('/', controller.all)
cartsRouter.get('/:id', controller.getOne)
cartsRouter.post('/', controller.save)
cartsRouter.put('/:id', controller.update)
cartsRouter.delete('/:id', controller.delete)
cartsRouter.delete('/', controller.clear)

export { cartsRouter }
