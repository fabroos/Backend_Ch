const messagesContainer = require('../api/messagesContainer.js')

const messages = new messagesContainer('messages.json')

const messagesController = {
  getAllMessages: function () {
    return messages.getAll()
  },
  addMessage: function (message) {
    return messages.addMessage(message)
  }
}

module.exports = messagesController
