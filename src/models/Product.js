//
//
const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
},{
    timestamps: true,
})

const objSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
   },
   countInStock: {
        type: Number,
        required: true,
        default: 0,
   }
},{
    timestamps: true,
    collection: 'product'
})

module.exports = mongoose.model('Product', objSchema)
