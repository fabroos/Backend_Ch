import express from 'express'
import { sessionHandler } from './middlewares/session.js'
import { messageRouter } from './router/messagesApi.js'
import { productRouter } from './router/productsApi.js'
import { productsTest } from './router/productsTest.js'
import { authRouter } from './router/authRouter.js'
import { webRouter } from './router/webRouter.js'
import { usersRouter } from './router/usersApi.js'
import {
  passortSessionMiddleware,
  passportMiddleware
} from './middlewares/passport.js'
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(sessionHandler)
app.use(passortSessionMiddleware)
app.use(passportMiddleware)
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/products-test', productsTest)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/', webRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}
  http://localhost:${server.address().port}`)
})
