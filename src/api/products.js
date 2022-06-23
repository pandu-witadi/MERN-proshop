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
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    await product.remove()
    return res.json({ 'message': 'product removed'})
})

// desc:    create product
// route:   POST /api/products
// access:  private/admin
const createProduct = asyncHandler( async (req, res) => {
    console.log('POST /api/products')
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })
    const createdProduct = await product.save()
    return res.status(201).json(createdProduct)
})

// desc:    update product
// route:   PUT /api/products/:id
// access:  private/admin
const updateProduct = asyncHandler( async (req, res) => {
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
    } = req.body

    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    product.name = name
    product.price= price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save()
    return res.json(updatedProduct)
})


// desc:    create new review
// route:   POST /api/products/:id/review
// access:  private
const createProductReview = asyncHandler( async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }

    const alreadyReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
        res.status(404)
        throw new Error('Product already reviewed')
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
        user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0 ) / product.reviews.length

    await product.save()
    return res.status(201).json({ message: 'review added'})
})

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview
}
