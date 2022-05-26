const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const productsRouter = require('./routers/products.js')
const cartsRouter = require('./routers/cart.js')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)
let adminManage = require('./admin/administer.js')

const server = app.listen(PORT, () => {
  console.log(`
Server listening on port ${server.address().port}
in ${app.settings.env} mode
open http://localhost:${PORT} in your browser`)
})

app.get('/login', (req, res) => {
  console.log('now you are logged as admin')
  adminManage.login()
  res.status(200).send('You are now logged in')
})

app.get('/logout', (req, res) => {
  console.log('now you are logged as normal user')
  adminManage.logout()
  res.status(200).send('You are now logged out')
})

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found')
})
