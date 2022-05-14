let messages = []

const addMessage = msg => {
  messages.push(msg)
}

const getMessages = () => {
  return messages
}

module.exports = {
  addMessage,
  getMessages
}
