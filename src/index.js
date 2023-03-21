import express from 'express'
// import ProductManager from './ProductManager.js'
import routerP from './Routes/products.router.js'
import routerC from './Routes/carts.router.js'

const app = express()
const PORT = 8080

app.listen(PORT, () => {console.log(`Connecting on port ${PORT}`)})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
// app.get('/api/products', async (req, res) => {
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

// app.get('/api/products/:pid', async (req, res) => {
//     let productManager = new ProductManager()
//     let result = await productManager.getProductById(parseInt(req.params.pid))
//     if (result) {
//         res.send(result)
//     } 
//     else {
//         res.send({status: "Error", message: "Current ID does not match with any product"})
//     }
// })