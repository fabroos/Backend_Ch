const { getMessages, addMessage } = require('../messages.js')

const controller = async (socket, io) => {
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', msg => {
    addMessage(msg)
    io.emit('chat message', getMessages())
  })

  socket.on('request messages', () =>
    io.sockets.emit('chat message', getMessages())
  )
}

module.exports = controller
