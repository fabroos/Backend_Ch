import express from 'express'
import { productsRouter } from './routers/productsRouter.js'
import { cartsRouter } from './routers/cartRouter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)

export default app
