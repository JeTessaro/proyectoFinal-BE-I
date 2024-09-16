const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const collectionName = 'cartsProducts'

const cartsSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: Number,
    category: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now()
    }
})

cartsSchema.plugin(mongoosePaginate)
const cartsModel = model(collectionName, cartsSchema)

module.exports = { cartsModel }