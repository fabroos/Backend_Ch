import Container from '../Containers/MongoDB.js'

const products = new Container('products')
const ProductController = {
  createProduct: function (req, res) {
    try {
      const { name, price, image } = req.body
      if (!name || !price || !image) {
        const err = new Error('Faltan datos')
        err.status = 400
        throw err
      }
      const list = products.guardar({ name, price, image })
      res.status(201).json(list)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  getAllProducts: async function (req, res) {
    try {
      const list = await products.listarAll()
      res.json(list)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  updateProduct: async function (req, res) {
    try {
      const { id } = req.params
      this.validateId(id)
      const { name, price, image } = req.body
      const newInfo = {}
      if (name) newInfo.name = name
      if (price) newInfo.price = price
      if (image) newInfo.image = image
      if (Object.keys(newInfo).length === 0) {
        const err = new Error('No se recibieron datos')
        err.status = 400
        throw err
      }
      const product = await products.actualizar(req.params.id, newInfo)
      res.json(product)
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  getProductById: async function (req, res) {
    try {
      const id = req.params.id
      this.validateId(id)
      res.json(await products.listar(id))
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  deleteProduct: async function (req, res) {
    try {
      const id = req.params.id
      this.validateId(id)
      await products.borrar(id)
      res.json({ message: 'Producto eliminado' })
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err.message, status: err.status })
    }
  },
  validateId (id) {
    if (isNaN(parseInt(id))) {
      const err = new Error('El id debe ser un numero')
      err.status = 400
      throw err
    }
  }
}

export { ProductController }
