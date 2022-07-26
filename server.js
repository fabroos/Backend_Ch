import 'dotenv/config'
import express from 'express'
// middlewares
import { sessionHandler } from './middlewares/session.js'
import {
  passortSessionMiddleware,
  passportMiddleware
} from './middlewares/passport.js'
// routers
import { webRouter } from './router/webRouter.js'
import { productRouter } from './router/productsApi.js'
import { messageRouter } from './router/messageRouter.js'
import { testRouter } from './router/testRouter.js'
import { authRouter } from './router/authRouter.js'

const app = express()
// middlewares
app.use(express.json())
app.use(sessionHandler)
app.use(passortSessionMiddleware)
app.use(passportMiddleware)
// routes
app.use('/', webRouter)
app.use('/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/test', testRouter)

export default app
