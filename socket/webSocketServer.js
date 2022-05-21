const { Server: WebSocketServer } = require('socket.io')

/* -------------------------------------------------------------------------- */
/*                              Web Socket Server                             */
/* -------------------------------------------------------------------------- */
const ProductController = require('./productController')
const messagesController = require('./messagesController')
function createWebScoketServer (server) {
  const io = new WebSocketServer(server)
  io.on('connection', socket => {
    console.log('New client connected')
    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
    // Product controller
    socket.on('product', async product => {
      await ProductController.addProduct(product)
      io.sockets.emit('product', await ProductController.getAllProducts())
    })
    socket.on('getAllProducts', async () => {
      socket.emit('product', await ProductController.getAllProducts())
    })
    // Messages controller
    socket.on('message', async message => {
      await messagesController.addMessage(message)
      io.sockets.emit('message', await messagesController.getAllMessages())
    })
    socket.on('getAllMessages', async () => {
      socket.emit('message', await messagesController.getAllMessages())
    })
  })
  return io
}

module.exports = createWebScoketServer
