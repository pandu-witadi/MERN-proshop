//
//
const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')


// desc:    list products
// route:   GET /api/products
// access:  public
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})
    return res.json(products)
})

// desc:    get a product by id
// route:   GET /api/products/:id
// access:  public
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product)
        return res.json(product)
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// desc:    delete product by id
// route:   DELETE /api/products/:id
// access:  private/admin
const deleteProduct = asyncHandler( async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    await product.remove()
    return res.json({ 'message': 'product removed'})
})


module.exports = {
    getProducts,
    getProductById,
    deleteProduct
}
