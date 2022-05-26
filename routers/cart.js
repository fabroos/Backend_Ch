const express = require('express')
const router = express.Router('/api/carts')
const controller = require('../api/controllers/cartsController.js')

// a. POST: '/' - Crea un carrito y devuelve su id.
router.post('/', controller.createCart)
// b. POST: '/:id_carrito/productos' - Para incorporar productos al carrito, enviando el id de
// producto en el cuerpo de la petición.
router.post('/:id/products', controller.createProduct)
// c. GET: '/:id_carrito/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/:id/products', controller.getCart)
// d. DELETE: '/:id_carrito/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito
// y de producto.
router.delete('/:cartId/products/:productId', controller.deleteProduct)
// e. DELETE: '/:id_carrito' - Vacía un carrito
router.delete('/:id', controller.clearCart)

module.exports = router
