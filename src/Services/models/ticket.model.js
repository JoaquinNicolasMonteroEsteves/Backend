import mongoose, { mongo } from 'mongoose'

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {type: String, unique: true, required: true},
    purchase_datetime: {type: Date},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true}
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)
export default ticketModel