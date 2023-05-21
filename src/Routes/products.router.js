import { Router } from "express";
import ProductService from '../Services/Product.Service.js'

const routerP = Router();
let PS = new ProductService()

routerP.post('/', async (req, res) => {
    try
    {
        // console.log(req.body);
        let result = await PS.addProduct(req.body)
        if(!result.status) {
            res.status(405).send({status: 'Error', msg: "An error occurred while trying to add a new product"})
        }
        res.status(201).send(result)
        
    }
    catch (error){
        return error
    }
})


export default routerP