import { Router } from "express";
import ProductManager from "../ProductManager.js";

const routerP = Router();

routerP.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit)??null
    let productManager = new ProductManager()
    let result = await productManager.getProducts()
    if(limit) {                                 
        let newArray = result.slice(0, limit)
        res.send(newArray)
    } else {
        res.send(result)
    }
})

routerP.get('/:pid', async (req, res) => {
    let productManager = new ProductManager()
    let result = await productManager.getProductById(parseInt(req.params.pid))
    if (result) {
        res.send(result)
    } 
    else {
        res.send({status: "Error", message: "Current ID does not match with any product"})
    }
})

routerP.post('/', async (req, res) => {
    let productManager = new ProductManager()
    let newProduct = req.body
    let result = await productManager.addProduct(newProduct)
    if (!result.status) {
        res.send(result)
    } else {
        res.send({status: "Complete", message: `Product successfully added with the id ${result.id} `})
    }
    
})


routerP.put('/:pid', async (req, res) => {
    let productManager = new ProductManager()
    let productId = parseInt(req.params.pid)
    let productUpdated = req.body
    let newParams = Object.keys(productUpdated)
    let newValues = Object.values(productUpdated)

    let update = await productManager.updateProduct(productId, newParams, newValues)
    if (!update.status) {
        res.send(update)
    } else{
        res.send(`Product with ID: ${productId} was successfully updated`)
    }



})
export default routerP