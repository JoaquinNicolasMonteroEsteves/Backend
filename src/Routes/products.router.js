import { Router } from "express";
import { addProduct, deleteProduct } from "../Controllers/products.controller.js";

const routerP = Router();

routerP.post('/', addProduct)

routerP.delete('/:pid', deleteProduct)

export default routerP