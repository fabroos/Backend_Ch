import { MongoClient } from 'mongodb'
import Container from './MongoDB.js'
const user = 'coderhouse'
const password = 'coderhouse'

const uri = `mongodb+srv://${user}:${password}@cluster0.fkfefba.mongodb.net/ecommerce?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})

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
