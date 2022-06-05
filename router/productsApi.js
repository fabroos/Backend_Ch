import express from 'express'
import { ProductController } from '../controllers/productController.js'
const router = express.Router('/api/products')

router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

export { router as productRouter }
