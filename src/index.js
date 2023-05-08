import express from 'express'
import routerP from './Routes/products.router.js'
import routerC from './Routes/carts.router.js'
import routerS from './Routes/sessions.router.js'
import routerU from './Routes/users.router.js'
import routerG from './Routes/github-login.views.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewRouter from './Routes/views.router.js'
import { Server } from 'socket.io'
import products from '../files/Products.json' assert { type: "json" }
import session from 'express-session'
import mongoose from 'mongoose'
import productModel from './dao/models/product.model.js'

import passport from 'passport'
import initializePassport from './config/passport.config.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

initializePassport()
app.use(passport.initialize())
app.use(passport,session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')

app.use(session({
    secret: "JMS3cret",
    resave: true,
    saveUninitialized: true
}))

const httpServer = app.listen(PORT, () => {
	console.log("Servidor escuchando por el puerto: " + PORT);
})

const DB = 'mongodb+srv://joaquinnme:contrademongo1@cluster0.bg1fcu8.mongodb.net/ecommerce'
const connectMongoDB = async () => {
    try {
        await mongoose.connect(DB)
        console.log("Connecting using MongoDB")
    }
    catch (error){
        process.exit()
    }
}
connectMongoDB()

app.use(express.static(__dirname+'/public'))


let productsDB = await productModel.find()

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    console.log("cliente conectado")
    socket.emit("hola",  productsDB )
})


app.use('/', viewRouter)
app.use('/users', routerU)
app.use('/api/sessions', routerS)
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/github', routerG)


