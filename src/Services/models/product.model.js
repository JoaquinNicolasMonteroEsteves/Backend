import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const stringTypeSchemaRequired = {
  type: String,
  required: true
}

const numberTypeSchemaUniqueRequired = {
  type: Number,
  unique: true,
  required: true
}

const numberTypeSchemaRequired = {
  type: Number,
  required: true
}

const booleanTypeSchemaRequired = {
  type: Boolean,
  required: true
}

const productSchema = new mongoose.Schema({
    title: stringTypeSchemaRequired,
    category:{ 
      type: String,
      required: true,
      enum: ['galletitas', 'bazar', 'libreria', 'bebidas']},
    description: stringTypeSchemaRequired,
    price: numberTypeSchemaRequired,
    thumbnail: Array,
    code: numberTypeSchemaUniqueRequired,
    stock: numberTypeSchemaRequired,
    status: booleanTypeSchemaRequired,
    owner: {
      type: String,
      required: true,
      default: 'admin'
    }
})

productSchema.plugin(paginate)
const productModel = mongoose.model(productCollection, productSchema)
export default productModel
