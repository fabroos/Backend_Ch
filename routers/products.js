const express = require('express')
const router = express.Router('api/products')
const controller = require('../api/controllers/productsController.js')
const adminManage = require('../admin/administer.js')

function checkAdmin (req, res, next) {
  if (adminManage.isAdmin) {
    next()
  } else {
    res.status(401).json({ status: 404, description: 'You are not authorized' })
  }
}

// a. GET: '/' - Me permite listar todos los productos disponibles (disponible para todos) ✅
router.get('/', controller.getAll)
// b. GET: '/:id' - Me permite listar un producto por su id (disponible para todos ) ✅
router.get('/:id', controller.getByID)
// c. POST: '/' - Para incorporar productos al listado (disponible solo para administradores) ✅
router.post('/', checkAdmin, controller.create)
// d. PUT: '/:id' - Actualiza un producto por su id (disponible solo para administradores) ✅
router.put('/:id', checkAdmin, controller.update)
// e. DELETE: '/:id' - Borra un producto por su id (disponible solo para administradores) ✅
router.delete('/:id', checkAdmin, controller.delete)

module.exports = router
