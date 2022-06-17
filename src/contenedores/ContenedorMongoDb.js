import { MongoClient, ObjectId } from 'mongodb'
import config from '../config.js'

const client = new MongoClient(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {
  constructor (nombreColeccion) {
    this.coleccion = nombreColeccion
    this.db = client.db(config.mongodb.db)
  }

  async listar (id) {
    try {
      await client.connect()
      let res = await this.db
        .collection(this.coleccion)
        .findOne({ _id: ObjectId(id) })
      res.id = res._id
      delete res._id
      return res
    } catch (err) {
      return null
    } finally {
      client.close()
    }
  }

  async listarAll () {
    try {
      await client.connect()
      return await this.db
        .collection(this.coleccion)
        .find({})
        .toArray()
    } catch (err) {
      throw err
    } finally {
      client.close()
    }
  }

  async guardar (nuevoElem) {
    try {
      await client.connect()
      const { insertedId } = await this.db
        .collection(this.coleccion)
        .insertOne(nuevoElem)
      nuevoElem.id = nuevoElem._id
      delete nuevoElem._id
      return { ...nuevoElem }
    } catch (err) {
      throw err
    } finally {
      client.close()
    }
  }

  async actualizar (nuevoElem, id) {
    try {
      await client.connect()
      await this.db
        .collection(this.coleccion)
        .updateOne({ _id: ObjectId(id) }, { $set: nuevoElem })
      return await this.listar(id)
    } catch (err) {
      throw err
    } finally {
      client.close()
    }
  }

  async borrar (id) {
    try {
      await client.connect()
      const res = await this.db
        .collection(this.coleccion)
        .deleteOne({ _id: ObjectId(id) })
      return res.acknowledged
    } catch (err) {
      throw err
    } finally {
      client.close()
    }
  }

  async borrarAll () {
    try {
      await client.connect()
      let res = await this.db.collection(this.coleccion).deleteMany({})
      return res.acknowledged
    } catch (err) {
      throw err
    } finally {
      client.close()
    }
  }
}

export default ContenedorMongoDb
