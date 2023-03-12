import express from 'express'
import products from '../files/Products.json' assert { type: "json" }
import ProductManager from './ProductManager.js'
// let productManager = new ProductManager()

const app = express()
const PORT = 8080

app.listen(PORT, () => {console.log(`Connecting on port ${PORT}`)})

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit)??null
    let productManager = new ProductManager()
    let result = await productManager.getProducts()
    if(limit) {                                 //Cómo controlar si el método devuelve el error del catch
        let newArray = result.slice(0, limit)
        res.send(newArray)
    } else {
        res.send(result)
    }
})

app.get('/products/:pid', async (req, res) => {
    let productManager = new ProductManager()
    let result = await productManager.getProductById(parseInt(req.params.pid))
    if (result) {
        res.send(result)
    } 
    else {
        res.send({status: "Error", message: "Current ID does not match with any product"})
    }
})





app.get('/products', (req, res) => {
    let limit =  parseInt(req.query.limit)??null
    if(limit) {
        let newArray = products.slice(0, limit)
        res.send(newArray)
    }
    res.send(products)
})

// app.get('/products/:pid', (req, res) => {
//     let foundProduct = products.find(p => p.id === parseInt(req.params.pid))??null
//     if (foundProduct){
//         res.send(foundProduct)
//     }
//     res.send({status: "Error", message: "Current ID does not match with any product"})
// })

