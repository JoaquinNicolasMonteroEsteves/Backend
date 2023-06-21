import mongoose, { mongo } from 'mongoose'

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {type: String, unique: true, required: true},
    purchase_datetime: {type: Date},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true},
    products: {
        type:[
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {type: Number}
            }
        ],
        default: []
    }
})

ticketSchema.pre('findOne', function() {
    this.populate("products.product");
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema)
export default ticketModel