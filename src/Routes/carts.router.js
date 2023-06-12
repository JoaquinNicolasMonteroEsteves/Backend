import { Router } from "express";
import { addCart, addProductToCart, deleteAllProductsFromCart, deleteProductFromCart, getCartById, purchaseCart, subtractProductUnit } from "../Controllers/carts.controller.js";

const routerC = Router();

//MongoDB
routerC.post('/', addCart)
routerC.get('/:cid', getCartById)
routerC.delete('/:cid/products/:pid', deleteProductFromCart)
routerC.delete('/:cid/products/:pid/unit', subtractProductUnit)
routerC.delete('/:cid', deleteAllProductsFromCart)
routerC.post('/:cid/products/:pid', addProductToCart )
routerC.post('/:cid/purchase', purchaseCart)

export default routerC