import { Router } from 'express'
import ProductService from '../Services/Product.Service.js'
import CartService from '../Services/Cart.Service.js'
import cookieParser from 'cookie-parser'
import { authorization, passportCall, readLinkFilter } from '../utils.js'

const viewRouter = Router()
let PS = new ProductService()
let CS = new CartService()

// Habilitación de las cookies
viewRouter.use(cookieParser("JM%&/123"))

viewRouter.get('/setCookies', (req, res) => {
    //Cookie con firma
    res.cookie('cookieJM', 'Esto es una cookie', {maxAge: 60000, signed: true}).send('Cookie') //Nombre, valor, tdv + firma
})

viewRouter.get('/getCookies', (req, res) => {
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
viewRouter.get('/logout', (req, res) => {
    res.clearCookie("jwtCookieToken").status(200).send()
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
    let products = await PS.getProducts()
    res.render('home', {products})
})

viewRouter.get('/carts/:cid', async (req, res) => {
    let result = await CS.getCartById(req.params.cid)
    res.render('cart', result)
})

viewRouter.get('/products', passportCall('login'), authorization(['user', 'admin']), async (req, res) => {
    let products = await PS.getProducts(req.query)
    let link_filter = readLinkFilter(req.query)
    
    products.prevLink = products.hasPrevPage? `http://localhost:8080/products?${link_filter}page=${products.prevPage}`:'None'
    products.nextLink = products.hasNextPage? `http://localhost:8080/products?${link_filter}page=${products.nextPage}`:'None'
    products.status = products ? "success" : "error"
    
    // products.docs.forEach(p => {
    //     if(p.stock == 0) {
    //         products.docs.splice(products.docs.indexOf(p), 1)
    //     }
    // })

    let data = {
        products: products,
        user: req.user
    }
    
    res.render('products', data)
})

viewRouter.get('/api/cart/:cid/purchase', async (req, res) => {
    
})

viewRouter.get('/current', passportCall('login'), authorization(['user', 'admin']), async (req, res) => {
    let data = {
        user: req.user,
        isAdmin: req.user.role === "admin" ? true : false,
        cart: req.user.cart_id ? await CS.getCartById(req.user.cart_id) : null
    }
    
    res.render('profile', data)
})

viewRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

export default viewRouter