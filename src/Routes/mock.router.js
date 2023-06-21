import { Router } from "express"
import { generateProducts } from "../services/mock/products.mock.js"

const routerMocks = new Router()

routerMocks.get('/', (req, res) => {
  const mockProducts = generateProducts()
  res.status(201).json( { mockProducts })
})

export default routerMocks