//
//
const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')


const getAllProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})
    return res.json(products)
})

const getProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product)
        return res.json(product)
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})


module.exports = {
    getAllProducts,
    getProduct
}
