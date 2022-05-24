//
//
const router = require('express').Router()
const { authRequired } = require('../middleware/auth')

// -----------------------------------------------------------------------------
const test = require('./test')
router.get('/test', test.test_get)

// -----------------------------------------------------------------------------
const users = require('./users')
router.post('/users', users.register)
router.post('/users/login', users.login)
router.get('/users/profile', authRequired, users.getUserProfile)
router.put('/users/profile', authRequired, users.updateUserProfile)
router.get('/users/:id', users.getUserById)

// -----------------------------------------------------------------------------
const products = require('./products')
router.get('/products', products.getProducts)
router.get('/products/:id', products.getProductById)


// -----------------------------------------------------------------------------
module.exports = router
