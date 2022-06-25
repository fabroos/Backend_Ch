import express from 'express'
import { messageRouter } from './router/messagesApi.js'
import { productRouter } from './router/productsApi.js'
import { productsTest } from './router/productsTest.js'

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/products-test', productsTest)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}
  http://localhost:${server.address().port}`)
})
