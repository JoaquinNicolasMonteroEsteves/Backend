import { Router } from 'express'
import ProductManager from '../dao/Dao/ProductManagerFS.js'
import ProductManagerMDB from '../dao/Dao/ProductManagerMongoDB.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { readLinkFilter } from '../utils.js'
import CartManagerDB from '../dao/Dao/CartManagerMongoDB.js'

const viewRouter = Router()

// Habilitación de las cookies
viewRouter.use(cookieParser("JM%&/123"))

viewRouter.get('/setCookies', (req, res) => {
    //Cookie sin firma    
    //res.cookie('cookieJM', 'Esto es una cookie', {maxAge: 60000}).send('Cookie') //Nombre, valor, tdv
    
    //Cookie con firma
    res.cookie('cookieJM', 'Esto es una cookie', {maxAge: 60000, signed: true}).send('Cookie') //Nombre, valor, tdv + firma
})

viewRouter.get('/getCookies', (req, res) => {
    //Lectura de cookie sin firma
    //res.send(req.cookies)

    //Lectura de cookie con firma
    res.send(req.signedCookies) //Me traigo el valor de la cookie
})

viewRouter.get('/deleteCookies', (req, res) => {
    res.clearCookie('cookieJM').send('Cookie borrada') //Eliminar la cookie y le paso el nombre
})

//Session management
viewRouter.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++
        res.send(`Welcome back for de ${req.session.counter} time`)
    } else {
        req.session.counter = 1
        res.send("Welcome for your first time!")
    }
})

//Loggin
viewRouter.get('/login', (req, res) => {
    const {username, password} = req.query

    if (username !== 'pepe' || password !== 'pepepass') {
        return res.status(401).send("Failed loggin or data entrance")
    } else {
        req.session.user = username
        req.session.admin = true
        res.send("Loggin successfull!")
    }
})

//Loggin
viewRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({error: "Logout error", msg: "Failed on closing session"})
        } else {
            res.status(200).send()
        }
    })
})

//Autenticación
function auth(req, res, next) {
    if (req.session.user === 'pepe' && req.session.admin){
        return next()
    }
    else {
        return res.status(403)
    }
}

viewRouter.get('/private', auth, (req, res) => {
    res.send("If you are seeing this is because you are Pepe!")
})

viewRouter.get('/', async (req, res) =>{
    let productManager = new ProductManager()
    let products = await productManager.getProducts()
    res.render('home', {products})
})

viewRouter.get('/carts/:cid', async (req, res) => {
    let CM = new CartManagerDB()
    let result = await CM.getCartById(req.params.cid)
    res.render('cart', result)
})

viewRouter.get('/products', async (req, res) => {
    let PM = new ProductManagerMDB()
    let products = await PM.getProducts(req.query)

    let link_filter = readLinkFilter(req.query)
    
    products.prevLink = products.hasPrevPage? `http://localhost:8080/products?${link_filter}page=${products.prevPage}`:'None'
    products.nextLink = products.hasNextPage? `http://localhost:8080/products?${link_filter}page=${products.nextPage}`:'None'
    products.status = products ? "success" : "error"
    
    let data = {
        products: products,
        user: req.session.user
    }
    
    res.render('products', data)
})

viewRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

export default viewRouter