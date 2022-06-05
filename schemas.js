const productSchema = table => {
  table.increments('id').primary()
  table.string('name')
  table.string('image')
  table.string('price')
}

const messageSchema = table => {
  table.increments('id').primary()
  table.string('email')
  table.string('message')
  table.integer('timestamp')
}

export { productSchema, messageSchema }
