import MongoStore from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import { messageRouter } from './router/messagesApi.js'
import { productRouter } from './router/productsApi.js'
import { productsTest } from './router/productsTest.js'
import { authRouter } from './router/authRouter.js'
import { webRouter } from './router/webRouter.js'
const app = express()
const mongoUrl =
  'mongodb+srv://coderhouse:coderhouse@cluster0.fkfefba.mongodb.net/ecommerce'
app.use(
  session({
    // store: new FileStore({ path: './sessions', ttl: 300, retries: 0 }),
    store: MongoStore.create({
      mongoUrl,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }),
    secret: 'token',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600_000
    }
  })
)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/products-test', productsTest)
app.use('/auth', authRouter)
app.use('/', webRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}
  http://localhost:${server.address().port}`)
})
