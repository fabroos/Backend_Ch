import { schema } from 'normalizr'

const message = {
  email: 'ejemplo@mail.com',
  nombre: 'Juan',
  apellido: 'Perez',
  edad: 25,
  alias: 'juanperez',
  avatar: 'https://www.gravatar.com/avatar/12345678',
  texto: 'Este es un mensaje de prueba'
}

const author = new schema.Entity('author')

const messageSchema = new schema.Entity('message', {
  author: author
})
const messageListSchema = new schema.Entity('messages', {
  messages: [messageSchema]
})

export { messageSchema, messageListSchema }
