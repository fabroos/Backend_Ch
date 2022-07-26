import { MongoClient } from 'mongodb'
import Container from './MongoDB.js'

class UsersContainer extends Container {
  constructor () {
    super('users')
  }
  async obtenerUsuarioPorMail (email) {
    try {
      await this.client.connect()
      const user = await this.db.collection(this.coleccion).findOne({ email })
      return user
    } catch (err) {
      throw err
    } finally {
      this.client.close()
    }
  }
}

export { UsersContainer }
