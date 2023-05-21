import { Router } from "express";
import CartService from "../Services/Cart.Service.js";

const routerC = Router();
let CM = new CartService()

//MongoDB
routerC.get('/:cid', async (req, res) => {
    let result = await CM.getCartById(req.params.cid)
    res.status(201).send(result)
})

routerC.delete('/:cid/products/:pid', async (req, res) =>{
    let result = await CM.deleteProductFromCart(req.params.cid, req.params.pid)
    res.send(result)
})

routerC.delete('/:cid', async (req, res) => {
    let result = await CM.deleteAllProductsFromCart(req.params.cid)
    res.send(result)
})

routerC.post('/:cid/products/:pid', async (req, res) => {
    let result = await CM.addProductToCart(req.params.cid, req.params.pid)
    res.status(202).send(result)
})

routerC.put('/:cid/products/:pid', async (req, res) => {
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
    let result = await CM.addCart(req.body)
    res.send(result)
})

export default routerC