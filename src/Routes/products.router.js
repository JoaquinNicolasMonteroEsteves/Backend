import { Router } from "express";
import { addProduct } from "../Controllers/products.controller.js";

const routerP = Router();

routerP.post('/', addProduct)

export default routerP