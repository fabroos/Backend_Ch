import { schema, normalize, denormalize } from 'normalizr'

const message = {
  autor: {
    id: '1',
    email: 'ejemplo@mail.com',
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 25,
    alias: 'juanperez',
    avatar: 'https://www.gravatar.com/avatar/12345678'
  },
  texto: 'Este es un mensaje de prueba'
}

const messages = [
  { ...message, id: '2' },
  { ...message, id: '3' },
  { ...message, id: '4' },
  {
    id: '5',
    autor: {
      id: '5',
      email: 'dadsa',
      nombre: 'Juanasdasd',
      apellido: 'Psdadasderez',
      dni: '123123123',
      avatar: 'https://www.gravatar.com/avatar/1'
    },
    texto: 'Este es un mensaje de prueba2'
  }
]

// identificar entidades

const userShema = new schema.Entity('users')
const messageSchema = new schema.Entity('messages', {
  autor: userShema
})

const messageListSchema = new schema.Array(messageSchema)

import util from 'util'

function print (obj) {
  console.log(util.inspect(obj, false, 12, true))
}

// obj original
print(messages)
console.log(JSON.stringify(messages).length)

// obj normalizado
const normalized = normalize(messages, messageListSchema)
print(normalized)
console.log(JSON.stringify(normalized).length)

// obj desnormalizado
const denormalized = denormalize(
  normalized.result,
  messageListSchema,
  normalized.entities
)

print(denormalized)
import { faker } from '@faker-js/faker'
console.log(JSON.stringify(denormalized).length)
const randomProduct = () => ({
  id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  description: faker.lorem.paragraph(),
  image: faker.image.imageUrl()
})
const products = []
Array.from({ length: 10 }).forEach(() => products.push(randomProduct()))
console.log(products)
