import { Router } from 'express'
import { getDao } from '../daos/CRUDS/index.js'

const productsDao = await getDao({
  collectionName: 'products',
  filePath: './DB/'
})

const productsRouter = Router()

const controller = {
  all: async (req, res) => {
    try {
      const products = await productsDao.listarAll()
      if (products.length === 0) {
        res.status(404).json({ message: 'No hay productos' })
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
      const product = await productsDao.listar(req.params.id)
      if (!product) {
        res.status(404).json({ message: 'No existe el producto' })
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
      const { title, price, image } = req.body
      if (!title || !price || !image) {
        return res.status(400).json({ message: 'Faltan datos' })
      }
      const prodAgregado = await productsDao.guardar({
        title,
        price,
        image
      })
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
      const { title, price, image } = req.body
      if (!title && !price && !image) {
        return res.status(400).json({ message: 'Faltan datos' })
      }
      let newProduct = {}
      if (title) {
        newProduct.title = title
      }
      if (price) {
        newProduct.price = price
      }
      if (image) {
        newProduct.image = image
      }
      const prodActualizado = await productsDao.actualizar(
        newProduct,
        req.params.id
      )
      res.json(prodActualizado)
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500
      })
    }
  },
  delete: async (req, res) => {
    try {
      const state = await productsDao.borrar(req.params.id)
      if (!state) {
        return res.status(404).json({ message: 'No existe el producto' })
      }
      res.json({ message: 'Producto eliminado' })
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500
      })
    }
  },
  clear: async (req, res) => {
    try {
      await productsDao.borrarAll()
      res.json({ message: 'Productos eliminados' })
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500
      })
    }
  }
}

productsRouter.get('/', controller.all)
productsRouter.get('/:id', controller.getOne)
productsRouter.post('/', controller.save)
productsRouter.put('/:id', controller.update)
productsRouter.delete('/:id', controller.delete)
productsRouter.delete('/', controller.clear)

export { productsRouter }
