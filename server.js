const express = require('express')
const { Server: IOServer } = require('socket.io')
const { Server: HTTPServer } = require('http')
const router = require('./router/web')
const socketController = require('./socket/socketController')

// Init express and socket.io
const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

// Set up routes
app.use(express.static('public'))
app.use(router)

// Listen for socket.io connections and express requests
httpServer.listen(8080, () => {
  console.log('listening on https://localhost:' + httpServer.address().port)
})

// Listen for socket.io connections
io.on('connection', socket => socketController(socket, io))

// socket.io error handling
io.on('error', err => {
  console.log(err)
})
