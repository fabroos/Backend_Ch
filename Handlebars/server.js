const webRouter = require('./router/webRouter.js')
const express = require('express')
const { engine } = require('express-handlebars')

const app = express()
// engine
app.engine(
  'hbs',
  engine({
    extname: 'hbs'
  })
)
app.set('view engine', 'hbs')
// public
app.use(express.static('public'))
// router
app.use(webRouter)
// init server
const port = 8080
const server = app.listen(port, () =>
  console.log(`
App listening on port ${server.address().port}!
the app is running on http://localhost:${server.address().port}
`)
)
