import { Router } from "express";
import ProductManager from "../dao/Dao/ProductManagerFS.js";
import ProductManagerMDB from "../dao/Dao/ProductManagerMongoDB.js";

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

    }
})

const readLinkFilter = (filter) => {
    let le_ble = ''
    let bla_filter = filter
    bla_filter.page ? delete bla_filter.page : {}
    let bla_keys = Object.keys(bla_filter)
    let bla_values = Object.values(bla_filter)
    let bla_pairs = bla_keys.concat(bla_values)
    if (bla_pairs != []) {
        for (let i=0; i< (bla_pairs.length/2); i++){
            let string = `${bla_pairs[i]}=${bla_pairs[i+bla_pairs.length/2]}&`
            le_ble += string
        }
    }
}




// //FileSystem
// routerP.get('/', async (req, res) => {
//     let limit = parseInt(req.query.limit)??null
//     let productManager = new ProductManager()
//     let result = await productManager.getProducts()
//     if(limit) {                                 
//         let newArray = result.slice(0, limit)
//         res.send(newArray)
//     } else {
//         res.send(result)
//     }
// })

// routerP.get('/:pid', async (req, res) => {
//     let productManager = new ProductManager()
//     let result = await productManager.getProductById(parseInt(req.params.pid))
//     if (result.status) {
//         res.send(result)
//     } 
//     else {
//         res.send(result)
//     }
// })

// routerP.post('/', async (req, res) => {
//     let productManager = new ProductManager()
//     let newProduct = req.body
//     let result = await productManager.addProduct(newProduct)
//     if (!result.status) {
//         res.send(result)
//     } else {
//         res.send(`Product ${result.title} was successfully added`)
//     }
    
// })


// routerP.put('/:pid', async (req, res) => {
//     let productManager = new ProductManager()

//     let productId = parseInt(req.params.pid)

//     let productUpdated = req.body
//     let newParams = Object.keys(productUpdated)
//     let newValues = Object.values(productUpdated)

//     let update = await productManager.updateProduct(productId, newParams, newValues)
//     if (!update.status) {
//         res.send(update)
//     } else{
//         res.send(`Product with ID: ${productId} was successfully updated`)
//     }
// })

// routerP.delete('/:pid', async (req, res) => {
//     let productManager = new ProductManager()
//     let productID = parseInt(req.params.pid)
    
//     let deleted = await productManager.deleteProduct(productID)
//     if (!deleted.status) {
//         res.send(deleted)
//     } else {
//         res.send(`Product with ID: ${productID} has been successfully deleted`)
//     }
// })

export default routerP