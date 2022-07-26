import express from 'express'
import { faker } from '@faker-js/faker'

import { mode } from '../args.js'
import { fork } from 'child_process'
import cluster from 'cluster'
import { calcular } from '../calcularRandom.js'
const router = express.Router('/api/products-test')

const randomProduct = () => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  description: faker.lorem.paragraph(),
  image: faker.image.imageUrl()
})

router.get('/', (req, res) => {
  const products = []
  Array.from({ length: 5 }).forEach(() => products.push(randomProduct()))
  res.json(products)
})

router.get('/random', (req, res) => {
  if (mode === 'fork') {
    const process = fork('./calcularRandom.js')
    process.on('message', message => {
      if (message == 'end') {
        process.send(req.query.cant || 50000)
      } else {
        res.json(message)
      }
    })
  } else {
    res.json(calcular(req.query.cant || 50000))
  }
})

export { router as testRouter }
