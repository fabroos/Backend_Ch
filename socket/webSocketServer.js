import { Server } from 'socket.io'
import { messagesController } from '../controllers/messagesController'

function createWebScoketServer (server) {
  const io = new Server(server)
  io.on('connection', socket => {
    console.log('user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    // messages ----------;
    socket.on('getAllMessages', () => {
      messagesController.getAllMessages().then(messages => {
        socket.emit('allMessages', messages)
      })
    })
    // addMessage ----------;
    socket.on('addMessage', message => {
      messagesController.addMessage(message).then(message => {
        socket.emit('newMessage', message)
      })
    })
  })
  return io
}

export default createWebScoketServer
