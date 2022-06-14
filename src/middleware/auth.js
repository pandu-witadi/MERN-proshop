//
//
const asyncHandler = require('express-async-handler')

const User = require('../models/User')
const { decodeToken } = require('../utils/auth')


const authRequired = asyncHandler( async(req, res, next) => {
    const accessToken = req.get('x-access-token')
    if(!accessToken) {
        res.status(401)
        throw new Error('No authentication token, access denied')
    }

    try {
        const decoded = decodeToken(accessToken)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (err) {
        res.status(401)
        throw new Error('Token verification failed, authorization denied')
    }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}


module.exports = {
    authRequired,
    admin
}
