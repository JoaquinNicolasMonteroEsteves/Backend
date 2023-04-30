import { Router } from "express";
import ProductManager from "../dao/Dao/ProductManagerFS.js";
import ProductManagerMDB from "../dao/Dao/ProductManagerMongoDB.js";
import { readLinkFilter } from "../utils.js";

const routerP = Router();

//MongoDB
routerP.get('/', async (req, res) => {
    try {
        let PM = new ProductManagerMDB()
        let products = await PM.getProducts(req.query)  

        let link_filter = readLinkFilter(req.query)
        products.prevLink = products.hasPrevPage? `http://localhost:8080/api/products?${link_filter}page=${products.prevPage}`:'None'
        products.nextLink = products.hasNextPage? `http://localhost:8080/api/products?${link_filter}page=${products.nextPage}`:'None'
        products.status = products ? "success" : "error"

        res.send(products)
    } catch (error) {
        return error
    }
})

routerP.post('/', async (req, res) => {
    try
    {
        let PM = new ProductManagerMDB()
        let result = await PM.addProduct(req.body)
        res.status(201).send(result)
        
    }
    catch (error){
        return error
    }
})


export default routerP