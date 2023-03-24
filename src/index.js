import express from 'express'
import routerP from './Routes/products.router.js'
import routerC from './Routes/carts.router.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewRouter from './Routes/views.router.js'
import { Server } from 'socket.io'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')

app.use(express.static(__dirname+'/public'))

const httpServer = app.listen(PORT, () => {
	console.log("Servidor escuchando por el puerto: " + PORT);
})

app.use('/', viewRouter)



const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    console.log("cliente conectado")

})

app.use('/api/products', routerP)
app.use('/api/carts', routerC)




