import { faker } from '@faker-js/faker'

faker.locale = 'es'

export const createMockItem = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    category: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.random.numeric(),
    thumbnail: faker.image.image(),
    stock: faker.random.numeric(1),
    status: true
  }
}

export const generateProducts = () => {
  let numberOfItems = 100
  let mockItems = []
  for (let i = 0; i < numberOfItems; i++) {
    mockItems.push(createMockItem())
  }
  return mockItems
}