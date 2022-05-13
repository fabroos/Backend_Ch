const fs = require('fs/promises')
module.exports = class Contenedor {
  constructor (path) {
    this.path = path
  }
  async getAll () {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)

      return dataJson
    } catch (e) {
      throw e
    }
  }
  async save (obj) {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)
      dataJson.push(obj)
      await fs.writeFile(this.path, JSON.stringify(dataJson))
      return obj
    } catch (e) {
      throw new Error('No se pudo guardar el objeto')
    }
  }
  async getById (id) {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)
      let obj = dataJson.find(obj => obj.id === id)
      if (!obj) {
        let err = new Error('No se encontró el objeto')
        err.status = 404
        throw err
      }
      return obj
    } catch (e) {
      throw e
    }
  }

  async getRandom () {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      data = JSON.parse(data)
      let random = Math.floor(Math.random() * data.length)
      return data[random]
    } catch (e) {
      throw e
    }
  }
  async deleteById (id) {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)
      let objIndex = dataJson.findIndex(obj => obj.id === id)
      if (objIndex > -1) dataJson.splice(objIndex, 1)
      else {
        let err = new Error('No se encontró el objeto')
        err.status = 404
        throw err
      }
      await fs.writeFile(this.path, JSON.stringify(dataJson))
      console.log('Se ha eliminado el objeto')
    } catch (e) {
      throw e
    }
  }
  async update (id, newInfo) {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)
      let objIndex = dataJson.findIndex(obj => obj.id === id)
      if (objIndex > -1)
        dataJson[objIndex] = { ...dataJson[objIndex], ...newInfo }
      else {
        let err = new Error('No se encontró el objeto')
        err.status = 404
        throw err
      }
      await fs.writeFile(this.path, JSON.stringify(dataJson))
      return dataJson[objIndex]
    } catch (e) {
      throw e
    }
  }
  async deleteAll () {
    try {
      await fs.writeFile(this.path, '')
      console.log('Se han eliminado todos los objetos')
    } catch (e) {
      console.log('hubo un error')
    }
  }
}
