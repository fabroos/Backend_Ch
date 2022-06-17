import admin from 'firebase-admin'
import config from '../config.js'

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore()

class ContenedorFirebase {
  constructor (nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion)
  }

  async listar (id) {
    try {
      const doc = await this.coleccion.doc(id).get()
      if (doc.exists) {
        return doc.data()
      }
      return null
    } catch (err) {
      throw err
    }
  }

  async listarAll () {
    try {
      const docs = await this.coleccion.get()
      const res = []
      docs.forEach(doc => {
        res.push({ id: doc.id, ...doc.data() })
      })
      return res
    } catch (err) {
      throw `Error al listar: ${err}`
    }
  }

  async guardar (nuevoElem) {
    try {
      const doc = await this.coleccion.add(nuevoElem)
      nuevoElem.id = doc.id
      return { ...nuevoElem }
    } catch (err) {
      throw `Error al guardar: ${err}`
    }
  }

  async actualizar (nuevoElem, id) {
    try {
      const doc = await this.coleccion.doc(id).get()

      if (!doc.exists) {
        let err = new Error('No existe')
        err.status = 404
        throw err
      }
      await this.coleccion.doc(id).update(nuevoElem)
      return { id, ...doc.data(), ...nuevoElem }
    } catch (err) {
      throw err
    }
  }

  async borrar (id) {
    try {
      return await this.coleccion.doc(id).delete()
    } catch (err) {
      throw new Error(`Error al borrar`)
    }
  }

  async borrarAll () {
    // version fea e ineficiente pero entendible para empezar
    try {
      const docs = await this.listarAll()
      const ids = docs.map(d => d.id)
      const promesas = ids.map(id => this.borrar(id))
      const resultados = await Promise.allSettled(promesas)
      const errores = resultados.filter(r => r.status == 'rejected')
      if (errores.length > 0) {
        throw new Error('no se borró todo. volver a intentarlo')
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }
}

export default ContenedorFirebase
