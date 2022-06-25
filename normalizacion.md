========================

- **Persona**
  - Nombre: `string`
  - Apellido: `string`
  - direccion
    - calle: `string`
    - numero: `int`
    - cp: `int`

========================

- **Persona**

  - Nombre: `string`
  - Apellido: `string`
  - direccion: `id`

- **direccion**
  - id: `int`
  - calle: `string`
  - numero: `int`
  - cp: `int`

---

========================

- **Mensajes**
  - autor
    - email
    - nombre
    - apellido
    - dni
    - avatar
  - texto

========================

- **mensaje**

  - autor `id`
  - texto `string`

- **autor**
  - id
  - email
  - nombre
  - apellido
  - dni
  - avatar

=================================

[

### mensajes array

---

- **message**

  - **autor**
    - email
    - nombre
    - apellido
    - dni
    - avatar
  - texto

- **message**

  - **autor**
    - email
    - nombre
    - apellido
    - dni
    - avatar
  - texto

---

## pasa a

- **Mensaje**
  - Texto: String
  - Autor: id

### autores

- **Autor**
  - id
  - email
  - nombre
  - apellido
  - dni
  - avatar

=================================

## Ejemplo con normalizacion de un blogpost

```js
import { schema, normalize, denormalize } from 'normalizr'
import util from 'util'

const publicacion = {
  id: '1',
  title: 'My first blog post',
  description: 'This is my first blog post',
  content: 'hello world',
  author: {
    id: `1`,
    name: 'John Doe'
  },
  comments: [
    {
      id: '1',
      author: 'Rob',
      content: 'This is a great post'
    },
    {
      id: '2',
      author: 'Jane',
      content: 'I totally agree'
    }
  ]
}

// crear schema de usuarios (authores y comentadores)
const authorSchema = new schema.Entity('authors')

//  crear schema de comentarios

const commentSchema = new schema.Entity('comments')

// crear schema de publicacion

const publicacionSchema = new schema.Entity('publicacion', {
  author: authorSchema,
  comments: [commentSchema]
})

// ------------------------------------------------------------

function print (obj) {
  console.log(util.inspect(obj, false, 12, true))
}

// objeto original
console.log('original')
print(publicacion)
console.log(JSON.stringify(publicacion).length)

// objeto normalizado
console.log('normalizado')
const normalized = normalize(publicacion, publicacionSchema)
print(normalized)
console.log(JSON.stringify(normalized).length)

// objeto desnormalizado

console.log('desnormalizado')
const denormalized = denormalize(
  normalized.result,
  publicacionSchema,
  normalized.entities
)
print(denormalized)
console.log(JSON.stringify(denormalized).length)
```
