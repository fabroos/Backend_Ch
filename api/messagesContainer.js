const fs = require('fs')
class messagesContainer {
  constructor (path) {
    this.path = path
  }
  async getAll () {
    try {
      return JSON.parse(await fs.promises.readFile(this.path))
    } catch (err) {
      throw err
    }
  }
  async addMessage (message) {
    try {
      let messages = await this.getAll()
      messages.push(message)
      await fs.promises.writeFile(this.path, JSON.stringify(messages))
    } catch (err) {
      throw err
    }
  }
}

module.exports = messagesContainer
