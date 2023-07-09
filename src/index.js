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
import session from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
import config from './config/config.js'
import routerM from './Routes/messages.router.js'
import routerMocks from './Routes/mock.router.js'
import { addLogger } from './config/logger_Base.js'
import MongoSingleton from './config/mongodb-singleton.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

initializePassport()
app.use(session({
    secret: "JMS3cret",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser('BackendJNME'))

//Helpers for handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')

let hbs = handlebars.create({})

hbs.handlebars.registerHelper("isAdmin", function (role, options) {
    if (role === "admin") {
        return options.fn(this)  
    } 
    return options.inverse(this) 
})

hbs.handlebars.registerHelper("isNotPremium", function (role, options) {
    if (role !== "premium") {
        return options.fn(this)  
    } 
    return options.inverse(this) 
})

hbs.handlebars.registerHelper("isPremium", function (role, options) {
    if (role === "premium") {
        return options.fn(this)  
    } 
    return options.inverse(this) 
})

hbs.handlebars.registerHelper("isAdminOrPremium", function (role, options) {
    if (role === "premium" || role === "admin" ) {
        return options.fn(this)  
    } 
    return options.inverse(this) 
})

hbs.handlebars.registerHelper("isMoreThanOne", function (quantity, options) {
    if (quantity > 1) {
        return options.fn(this)  
    } 
    return options.inverse(this) 
})



const httpServer = app.listen(config.port, () => {
	console.log("Servidor escuchando por el puerto: " + config.port);
})

const DB = config.mongoUrl
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

//Logger
app.use(addLogger)

app.get("/logger", (req, res) => {
    res.send("Testing site for /logger endpoint")
})

//Socket
const socketServer = new Server(httpServer)

let messages = []
socketServer.on('connection', socket => {
    socket.on('message', data => {
        messages.push(data)
        socketServer.emit('messageLogs', messages)
    })
    
})


const mongoInstance = async (req, res) => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        req.logger.error(error);
    }
};
mongoInstance();

//Routers
app.use('/', viewRouter)
app.use('/users', routerU)
app.use('/api/sessions', routerS)
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/api/messages', routerM)
app.use('/github', routerG)
app.use('/mockingproducts', routerMocks)