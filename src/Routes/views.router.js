import { Router } from 'express'
import ProductService from '../Services/Product.Service.js'
import CartService from '../Services/Cart.Service.js'
import UserSerivce from '../Services/Users.Service.js'
import cookieParser from 'cookie-parser'
import { authorization, hourTime, passportCall, readLinkFilter } from '../utils.js'
import { environment } from '../config/config.js'
import userModel from '../Services/models/user.model.js'
import { renderUsers } from '../Controllers/users.controller.js'

const viewRouter = Router()
let PS = new ProductService()
let CS = new CartService()
let US = new UserSerivce()

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


//Logout
viewRouter.get('/logout/:umail', async (req, res) => {
    let time = hourTime()
    await userModel.findOneAndUpdate({email: req.params.umail}, {last_connection: time })
    res.clearCookie("jwtCookieToken").status(201).send({status: "success", message: 'Logout successful!'})
})

viewRouter.get('/carts/:cid', async (req, res) => {
    let result = await CS.getCartById(req.params.cid)
    res.render('cart', result)
})

viewRouter.get('/products', passportCall('login'), authorization(['user','premium', 'admin']), async (req, res) => {
    let products = await PS.getProducts(req.query)
    let link_filter = readLinkFilter(req.query)
    
    products.prevLink = products.hasPrevPage? `http://localhost:8080/products?${link_filter}page=${products.prevPage}`:'None'
    products.nextLink = products.hasNextPage? `http://localhost:8080/products?${link_filter}page=${products.nextPage}`:'None'
    products.status = products ? "success" : "error"


    // products.docs.forEach(p => {
    //     if(p.stock === 0) {
    //         products.docs.splice(products.docs.indexOf(p), 1)
    //     }
    // })
    let user = await US.getUser({email: req.user.email})
    req.user.role = user.role
    let data = {
        products: products,
        user: req.user
    }
    if (environment === "testing") {
        res.status(201).send({status: "success", msg: 'Products were succesfully displayed', user: data.user})
    } else {
        res.render('products', data)
    }
})


viewRouter.get('/current', passportCall('login'), authorization(['user', 'premium', 'admin']), async (req, res) => {
    let data = {
        user: req.user,
        isAdmin: req.user.role === "admin" ? true : false,
        cart: req.user.cart_id ? await CS.getCartById(req.user.cart_id) : null
    }
    
    res.render('profile', data)
})

viewRouter.get('/premium', passportCall('login'), authorization(['user']), (req, res) => {
    let data = { user: req.user }
    res.render("upgradeUser", data)
})

viewRouter.get('/restore/password', passportCall('login'), authorization(['admin','premium','user']), (req, res) => {
    let data = {user: req.user}
    res.render("restore", data)
})

viewRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

viewRouter.get('/users', passportCall('login'), authorization(['admin']), renderUsers)

export default viewRouter