import express from 'express'
import { faker } from '@faker-js/faker'
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

export { router as productsTest }
