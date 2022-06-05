import { Server } from 'socket.io'
import { messageController } from '../controllers/messagesController.js'
import { ProductController } from '../controllers/productController.js'

function createWebScoketServer (server) {
  const io = new Server(server)
  io.on('connection', socket => {
    console.log('user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    // messages ----------;
    socket.on('get messages', () => {
      messageController.getAllMessages().then(messages => {
        socket.emit('allMessages', messages)
      })
    })
    // addMessage ----------;
    socket.on('post message', message => {
      messageController.addMessage(message).then(message => {
        socket.emit('newMessage', message)
      })
    })
    // putMessage ----------;
    socket.on('put message', message => {
      messageController.updateMessage(message).then(message => {
        socket.emit('updateMessage', message)
      })
    })
    // deleteMessage ----------;
    socket.on('delete message', message => {
      messageController.deleteMessage(message).then(message => {
        socket.emit('deleteMessage', message)
      })
    })
    // products ----------;
    socket.on('get products', () => {
      ProductController.getAllProducts().then(products => {
        socket.emit('allProducts', products)
      })
    })
    // addProduct ----------;
    socket.on('post product', product => {
      ProductController.addProduct(product).then(product => {
        socket.emit('newProduct', product)
      })
    })
  })
  return io
}

export default createWebScoketServer
