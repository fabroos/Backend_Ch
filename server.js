const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
// public folder
app.use(express.static('public'))
// handlebars engine
app.engine('handlebars', engine({ extname: 'hbs' }))
app.set('view engine', 'handlebars')
// Init server
const port = 8080
const server = app.listen(port, () => {
  console.log(`App is running in http://localhost:${server.address().port}`)
})

// Router
const webRouter = require('./router/web.js')
app.use('/', webRouter)
