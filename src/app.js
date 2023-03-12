import express from 'express'
const ProductManager = require("./ProductManager.js")
let productManager = new ProductManager()

const app = express()
const PORT = 8080

app.use(express.urlencoded({extended:true}))

app.get('/products', (req, res) => {
    res.send()
})

app.get('/products/:pid', (req, res) => {

})

app.listen(PORT, () => {console.log(`Connecting on port `)})