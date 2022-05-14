const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
// app body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// public folder
app.use(express.static('public'))
// ===========================================================
// handlebars engine {}
// app.engine('handlebars', engine({ extname: 'hbs' }))
// app.set('view engine', 'handlebars')
// ===========================================================
// Pug engine 🐶
// app.set('view engine', 'pug')
// ===========================================================
// Ejs engine 🔐
// app.set('view engine', 'ejs')

// Init server
const port = 8080
const server = app.listen(port, () => {
  console.log(`App is running in http://localhost:${server.address().port}`)
})
app.on('error', err => {
  console.error(err)
})
// Router
const webRouter = require('./router/web.js')
app.use('/', webRouter)
