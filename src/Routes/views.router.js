import { Router } from 'express'
import ProductManager from "../ProductManager.js"

const viewRouter = Router()

viewRouter.get('/', async (req, res) =>{
    let productManager = new ProductManager()
    let products = await productManager.getProducts()
    res.render('home', {
        products
    })
})

viewRouter.get('/realtimeproducts', async (req, res) => {
    let productManager = new ProductManager()
    let products = await productManager.getProducts()
    res.render('realtimeproducts', {
        products
    })
})

export default viewRouter