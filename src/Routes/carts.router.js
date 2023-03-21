import { Router } from "express";
import CartManager from "../CartManager.js";

const routerC = Router();

routerC.post('/', async (req, res) => {
    let cartManager = new CartManager();
    let result = await cartManager.addCart()
    res.send(result)
})


routerC.get('/:cid', async (req, res) => {
    let cartManager = new CartManager();
    let result = await cartManager.getCartById(parseInt(req.params.cid))
    if(result.id){
        res.send(result)
    } else {
        res.send(result)
    }

})

routerC.post('/:cid/products/:pid', async (req, res) =>{
    let cartManager = new CartManager()
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)
    let result = await cartManager.addProductToCart(cartId, productId)
    res.send(result)
})

routerC.delete('/:cid/products/:pid', async (req, res) =>{
    let cartManager = new CartManager()
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)
    let result = await cartManager.deleteProductFromCart(cartId, productId)
    res.send(result)
})

export default routerC