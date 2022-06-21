//
//
const router = require('express').Router()
const { authRequired, admin } = require('../middleware/auth')

// -----------------------------------------------------------------------------
const test = require('./test')
router.get('/test', test.test_get)

// -----------------------------------------------------------------------------
const users = require('./users')
router.post('/users', users.register)
router.post('/users/login', users.login)
router.get('/users/profile', authRequired, users.getUserProfile)
router.put('/users/profile', authRequired, users.updateUserProfile)
router.get('/users', authRequired, admin, users.getUsers)
router.delete('/users/:id', authRequired, admin, users.deleteUser)
router.get('/users/:id', authRequired, admin, users.getUserById)
router.put('/users/:id', authRequired, admin, users.updateUser)

// -----------------------------------------------------------------------------
const products = require('./products')
router.get('/products', products.getProducts)
router.get('/products/:id', products.getProductById)
router.delete('/products/:id', authRequired, admin, products.deleteProduct)
router.post('/products', authRequired, admin, products.createProduct)
router.put('/products/:id', authRequired, admin, products.updateProduct)

// -----------------------------------------------------------------------------
const orders = require('./orders')
router.post('/orders', authRequired, orders.addOrderItems)
router.get('/orders/myorders', authRequired, orders.getMyOrders)
router.get('/orders/:id', authRequired, orders.getOrderById)
router.put('/orders/:id/pay', authRequired, orders.updateOrderToPaidById)
router.put('/orders/:id/deliver', authRequired, admin, orders.updateOrderToDelivered)
router.get('/orders', authRequired, admin, orders.getOrders)

// -----------------------------------------------------------------------------
const credential = require('./credential')
router.get('/credential/paypal', credential.getPaypalClientId)

// -----------------------------------------------------------------------------
const uploads = require('./uploads')
router.post('/upload', uploads.single('image'), (req, res) => {
    return res.send(`/${req.file.path}`)
})



// -----------------------------------------------------------------------------
module.exports = router
