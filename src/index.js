import express from 'express'
import routerP from './Routes/products.router.js'
import routerC from './Routes/carts.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewRouter from './Routes/views.router.js'
import { Server } from 'socket.io'
import products from '../files/Products.json' assert { type: "json" }
import session from 'express-session'
import mongoose from 'mongoose'
import productModel from './dao/models/product.model.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')

// app.use(session({
//     secret: "JMS3cret",
//     resave: true,
//     saveUninitialized: true
// }))

const httpServer = app.listen(PORT, () => {
	console.log("Servidor escuchando por el puerto: " + PORT);
})

const DB = 'mongodb+srv://joaquinnme:contrademongo1@cluster0.bg1fcu8.mongodb.net/ecommerce'
const connectMongoDB = async () => {
    try {
        await mongoose.connect(DB)
        console.log("Connecting using MongoDB");

        // await productModel.insertMany(
        //     [
        //         {
        //             title: "Maná de limón",
        //             description: "Galletitas de vainilla rellenas de crema de limón",
        //             price: 100,
        //             thumbnail: [
        //                 "https://i.ibb.co/4RM25pK/mana1.png"
        //             ],
        //             code: 100,
        //             stock: 20,
        //             status: true,
        //             category: "Galletitas"
        //         },
        //         {
        //             title: "Oreos",
        //             description: "Galletitas de chocolate con relleno de crema.",
        //             price: 120,
        //             thumbnail: [
        //                 "https://i.ibb.co/MgFfWdk/oreo1.jpg",
        //                 "https://i.ibb.co/wW8yhVy/oreo2.png"
        //             ],
        //             code: 101,
        //             stock: 15,
        //             status: true,
        //             category: "Galletitas"
        //         },
        //         {
        //             title: "Porteñitas",
        //             description: "Galletitas dulces y glaceadas de vainilla y caramelo.",
        //             price: 90,
        //             thumbnail: [
        //                 "https://i.ibb.co/f8NTTpw/port1.png",
        //                 "https://i.ibb.co/2KqBqSk/port2.jpg"
        //             ],
        //             code: 102,
        //             stock: 20,
        //             status: true,
        //             category: "Galletitas"
        //         },
        //         {
        //             title: "Gatorade",
        //             description: "Bebida nutritiva con los requerimientos necesarios para recuperarte rápidamente.",
        //             price: 150,
        //             thumbnail: [
        //                 "https://i.ibb.co/FX870mg/gato1.jpg",
        //                 "https://i.ibb.co/wBNryTT/gato2.jpg"
        //             ],
        //             code: 200,
        //             stock: 10,
        //             status: true,
        //             category: "Bebidas"
        //         },
        //         {
        //             title: "Fernet",
        //             description: "Bebida alcohólica elaborada a partir de la maceración de varias hierbas.",
        //             price: 250,
        //             thumbnail: [
        //                 "https://i.ibb.co/x8wbrw8/fernet1.png",
        //                 "https://i.ibb.co/5My6Rxh/fernet2.jpg"
        //             ],
        //             code: 201,
        //             stock: 5,
        //             status: true,
        //             category: "Bebidas"
        //         },
        //         {
        //             title: "Birome Bic",
        //             description: "Birome de la más alta calidad. Viene en azul, negro o rojo.",
        //             price: 20,
        //             thumbnail: [
        //                 "https://i.ibb.co/6ZCXGDD/bic1.png",
        //                 "https://i.ibb.co/k9GPv0r/bic2.jpg"
        //             ],
        //             code: 300,
        //             stock: 30,
        //             status: true,
        //             category: "Librería"
        //         },
        //         {
        //             title: "Bloc de hojas A4",
        //             description: "Bloc de 80 hojas A4 con troquelado fácil.",
        //             price: 75,
        //             thumbnail: [
        //                 "https://i.ibb.co/yhKj1Hx/a41.jpg",
        //                 "https://i.ibb.co/z6KTmqv/a42.jpg"
        //             ],
        //             code: 301,
        //             stock: 40,
        //             status: true,
        //             category: "Librería"
        //         },
        //         {
        //             title: "Marcador permanente Sharpie",
        //             description: "Marcador negro de altísima calidad de punta fina.",
        //             price: 100,
        //             thumbnail: [
        //                 "https://i.ibb.co/fS2RB65/sharp1.png"
        //             ],
        //             code: 302,
        //             stock: 13,
        //             status: true,
        //             category: "Librería"
        //         },
        //         {
        //             title: "Termo BGA",
        //             description: "Termo de fabricación nacional con tapa-taza.",
        //             price: 150,
        //             thumbnail: [
        //                 "https://i.ibb.co/1LNhNNz/termo1.jpg"
        //             ],
        //             code: 400,
        //             stock: 5,
        //             status: true,
        //             category: "Bazar"
        //         },
        //         {
        //             title: "Tupper Colombraro",
        //             description: "Contenedores de plástico de diferentes tamaños, excelentes para el guardado.",
        //             price: 125,
        //             thumbnail: [
        //                 "https://i.ibb.co/TM2sWpz/tupper1.jpg",
        //                 "https://i.ibb.co/GMQkj1K/tupper2.png"
        //             ],
        //             code: 401,
        //             stock: 30,
        //             status: true,
        //             category: "Bazar"
        //         },
        //         {
        //             title: "Operas",
        //             description: "Obleas rellenas de una maravillosa crema de vainilla",
        //             price: 75,
        //             thumbnail: [
        //                 "https://i.ibb.co/1rFcWXS/oper.jpg"
        //             ],
        //             code: 108,
        //             stock: 24,
        //             status: true,
        //             category: "Galletitas"
        //         }
        //     ])
        // console.log(await productModel.find());
        
    }
    catch (error){
        process.exit()
    }
}
connectMongoDB()

app.use(express.static(__dirname+'/public'))

app.use('/', viewRouter)


const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    console.log("cliente conectado")
    socket.emit("hola", { products })
})

app.use('/api/products', routerP)
app.use('/api/carts', routerC)




