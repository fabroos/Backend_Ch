import express from 'express'
import session from 'express-session'
// import sfs from 'session-file-store'
// const FileStore = sfs(session)
import MongoStore from 'connect-mongo'
const app = express()
app.use(express.json())
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
    maxAge: 600_000
  })
)

app.get('/contador', auth, (req, res) => {
  if (req.session.contador) {
    req.session.contador++
    return res.send(`ha visitado el sitio ${req.session.contador} veces`)
  }
  req.session.contador = 1

  return res.send(`ha visitado el sitio ${req.session.contador} veces`)
})

function auth (req, res, next) {
  if (req.session?.user === 'pepe' && req.session?.admin) {
    return next()
  }
  return res.status(401).send('error de authorizacion')
}

app.get('/logout', (req, res) => {
  console.log(req.session)
  req.session.destroy(err => {
    if (err) res.send({ status: 'logout err', body: err })
    else res.send('logout ok')
  })
})

app.get('/login', (req, res) => {
  const { username, password } = req.query
  if ((username !== 'pepe', password !== 'pepepass')) {
    return res.send('login failed')
  }
  req.session.user = username
  req.session.admin = true
  res.send('login success')
})

app.listen(8080, () => {
  console.log('listen in port 8080')
})
