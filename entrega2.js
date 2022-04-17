/*Consigna: Implementar programa que contenga una clase llamada ContenedorArchivo que
reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
● save(Object): void - Recibe un objeto, lo guarda en el archivo.
● getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
● getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
● deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
● deleteAll(): void - Elimina todos los objetos presentes en el archivo.*/
const fs = require('fs/promises')
class Contenedor {
  constructor (path) {
    this.path = path
  }
  async save (obj) {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)
      dataJson.push(obj)
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
      console.log('hubo un error')
    }
  }
  async getAll () {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      let dataJson = await JSON.parse(data)
      return dataJson
    } catch (e) {
      return []
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

const productos = new Contenedor('./productos.json')
// IIFE para tests[

;(async () => {
  await productos.save({
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1
  })
  await productos.save({
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    id: 2
  })
  await productos.save({
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    id: 3
  })
  await productos.deleteById(2)
  console.log('\n')
  console.log(await productos.getAll())
  console.log('\n')
  console.log(await productos.getById(1))
  console.log('\n')
  await productos.deleteAll()
  console.log('\n')
  console.log(await productos.getById(1))
})()
