class Contenedor {
  objetos = []
  save (obj) {
    this.objetos.push(obj)
  }
  getById (id) {
    return this.objetos.find(i => i.id === id) || null
  }
  deleteById (id) {
    let index = this.objetos.findIndex(i => i.id === id)
    this.objetos.splice(index, 1)
  }
  deleteAll () {
    this.objetos = []
  }
  getAll () {
    return this.objetos
  }
}

let a = new Contenedor() // declarando un objeto en base a la clase creada
a.save({
  id: 1,
  title: 'pancho',
  price: 100,
  thumbnail: 'pancho.png'
})
a.save({
  id: 2,
  title: 'pizza',
  price: 350,
  thumbnail: 'pizza.png'
})
a.save({
  id: 3,
  title: 'hamburguesa',
  price: 450,
  thumbnail: 'hamburguesa.png'
}) // guardando 3 objetos

console.log(a.getById(3)) // el de id 3

a.deleteById(3) // borrando el id 3

console.log(a.getAll()) // obtener todos

a.deleteAll() // borrar todos

console.log(a.getAll())
