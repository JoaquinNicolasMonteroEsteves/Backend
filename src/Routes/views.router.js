import { Router } from 'express'
import ProductManager from '../dao/Dao/ProductManagerFS.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const viewRouter = Router()

// // Habilitación de las cookies
// viewRouter.use(cookieParser("JM%&/123"))

// viewRouter.get('/setCookies', (req, res) => {
//     //Cookie sin firma    
//     //res.cookie('cookieJM', 'Esto es una cookie', {maxAge: 60000}).send('Cookie') //Nombre, valor, tdv
    
//     //Cookie con firma
//     res.cookie('cookieJM', 'Esto es una cookie', {maxAge: 60000, signed: true}).send('Cookie') //Nombre, valor, tdv + firma
// })

// viewRouter.get('/getCookies', (req, res) => {
//     //Lectura de cookie sin firma
//     //res.send(req.cookies)

//     //Lectura de cookie con firma
//     res.send(req.signedCookies) //Me traigo el valor de la cookie
// })

// viewRouter.get('/deleteCookies', (req, res) => {
//     res.clearCookie('cookieJM').send('Cookie borrada') //Eliminar la cookie y le paso el nombre
// })

// //Session management
// viewRouter.get('/', (req, res) => {
//     if(req.session.counter){
//         res.send(`Welcome back for de ${req.session.counter} time`)
//         req.session.counter++
//     } else {
//         req.session.counter = 1
//         res.send("Welcome for your first time!")
//     }
// })

// //Loggin
// viewRouter('/login', (req, res) => {
//     const {username, password} = req.query

//     if (username !== 'pepe' || password !== 'pepepass') {
//         return res.status(401).send("Failed loggin or data entrance")
//     } else {
//         req.session.user = username
//         req.session.admin = true
//         res.send("Welcome for your first time!")
//     }
// })

// //Loggin
// viewRouter('/logout', (req, res) => {
//     res.session.destroy(error => {
//         if (error) {
//             res.json({error: "Logout error", msg: "Failed on closing session"})
//         } else {
//             res.send("Session closed successfully")
//         }
//     })
// })

// //Autenticación
// function auth(req, res, next) {
//     if (req.session.user === 'pepe' && req.session.admin){
//         return next()
//     }
//     else {
//         return res.status(403).send("Your user has no authorization for this action")
//     }
// }

// viewRouter.get('/private', auth, (req, res) => {
//     res.send("If you are seeing this is because you have admin permission")
// })

viewRouter.get('/', async (req, res) =>{
    let productManager = new ProductManager()
    let products = await productManager.getProducts()
    res.render('home', {
        products
    })
})

viewRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

export default viewRouter