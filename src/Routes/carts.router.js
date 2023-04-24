import { Router } from "express";
import CartManager from "../dao/Dao/CartManagerFS.js";
import CartManagerDB from "../dao/Dao/CartManagerMongoDB.js";

const routerC = Router();

//MongoDB
routerC.get('/:cid', async (req, res) => {
    let CM = new CartManagerDB()
    let result = await CM.getCartById(req.params.cid)
    res.status(201).send(result)
})

routerC.delete('/:cid/products/:pid', async (req, res) =>{
    let CM = new CartManagerDB()
    let result = await CM.deleteProductFromCart(req.params.cid, req.params.pid)
    res.send(result)
})

routerC.delete('/:cid', async (req, res) => {
    let CM = new CartManagerDB()
    let result = await CM.deleteAllProductsFromCart(req.params.cid)
    res.send(result)
})

routerC.post('/:cid/products/:pid', async (req, res) => {
    let CM = new CartManagerDB()
    let result = await CM.addProductToCart(req.params.cid, req.params.pid)
    res.status(202).send(result)
})

routerC.put('/:cid/products/:pid', async (req, res) => {
    let CM = new CartManagerDB()
    let new_q = Object.keys(req.body)[0] == 'quantity' ? Object.values(req.body)[0] : Object.keys(req.body)[0]
    console.log(typeof(new_q));
    if(typeof(new_q) == 'number') {
        let result = await CM.updateProductQuantity(req.params.cid, req.params.pid, new_q)
        typeof(result) == 'string' ? res.status(403).send(result) : res.status(202).send(result)
    } else {
        res.status(403).send(`"${new_q}" is not correct`)
    }
})

routerC.post('/', async (req, res) => {
    let CM = new CartManagerDB()
    let result = await CM.addCart(req.body)
    res.send(result)
})

// //FileSytstem
// routerC.post('/', async (req, res) => {
//     let cartManager = new CartManager();
//     let result = await cartManager.addCart()
//     res.send(result)
// })


// routerC.get('/:cid', async (req, res) => {
//     let cartManager = new CartManager();
//     let result = await cartManager.getCartById(parseInt(req.params.cid))
//     if(result.id){
//         res.send(result)
//     } else {
//         res.send(result)
//     }
// })

// routerC.post('/:cid/products/:pid', async (req, res) =>{
//     let cartManager = new CartManager()
//     let cartId = parseInt(req.params.cid)
//     let productId = parseInt(req.params.pid)
//     let result = await cartManager.addProductToCart(cartId, productId)
//     res.send(result)
// })

// routerC.delete('/:cid/products/:pid', async (req, res) =>{
//     let cartManager = new CartManager()
//     let cartId = parseInt(req.params.cid)
//     let productId = parseInt(req.params.pid)
//     let result = await cartManager.deleteProductFromCart(cartId, productId)
//     res.send(result)
// })

export default routerC