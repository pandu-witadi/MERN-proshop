//
//
const router = require('express').Router()
const { authRequired } = require('../middleware/auth')


// -----------------------------------------------------------------------------
const users = require('./users')
router.post('/users', users.register)
router.post('/users/login', users.login)
router.get('/users/profile', authRequired, users.currentUser)

// -----------------------------------------------------------------------------
// const auth = require('./auth')
// router.get('/auth', authRequired, auth.currentUser)
// router.post('/auth', auth.login)

// // -----------------------------------------------------------------------------
// const profile = require('./profile')
// router.get('/profile/me', authRequired, profile.currentProfile)
// router.get('/profile', profile.allProfiles)
// router.get('/profile/user/:user_id', profile.profileById)
// router.get('/profile/github/:username', profile.getGithubRepos)
// router.post('/profile', authRequired, profile.createOrUpdate)
// router.put('/profile/experience', authRequired, profile.addExperience)
// router.delete('/profile/experience/:exp_id', authRequired, profile.deleteExperience)
// router.put('/profile/education', authRequired, profile.addEducation)
// router.delete('/profile/education/:edu_id', authRequired, profile.deleteEducation)
// router.delete('/profile', authRequired, profile.deleteAccount)

// -----------------------------------------------------------------------------
const products = require('./products')
router.get('/products', products.getProducts)
router.get('/products/:id', products.getProductById)


// -----------------------------------------------------------------------------
module.exports = router
