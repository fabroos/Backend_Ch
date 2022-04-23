const fs = require('fs/promises')

module.exports = class Contenedor {
  constructor (path) {
    this.path = path
  }
  async save (obj) {
    try {
      let data = await this.getAll()
      data.push(obj)
      await fs.writeFile(this.path, JSON.stringify(dataJson))
      console.log('Se ha guardado el objeto')
    } catch (e) {
      let dataJson = []
      dataJson.push(obj)
      await fs.writeFile(this.path, JSON.stringify(dataJson))
      console.log('Se ha creado el archivo')
    }
  }
  async getById (id) {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)
      let obj = dataJson.find(obj => obj.id === id)
      return obj || null
    } catch (e) {
      return null
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
      else return console.log('No se encontró el objeto')
      await fs.writeFile(this.path, JSON.stringify(dataJson))
      console.log('Se ha eliminado el objeto')
    } catch (e) {
      throw e
    }
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
  async deleteAll () {
    try {
      await fs.writeFile(this.path, '')
      console.log('Se han eliminado todos los objetos')
    } catch (e) {
      console.log('hubo un error')
    }
  }
}
