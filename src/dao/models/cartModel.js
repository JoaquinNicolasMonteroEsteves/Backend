import mongoose, { mongo } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
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

cartSchema.pre('findOne', function() {
    this.populate("products.product");
});

cartSchema.plugin(paginate)
const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel