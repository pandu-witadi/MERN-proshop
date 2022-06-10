//
//
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const CF = require('../config/default')


const authRequired = asyncHandler( async(req, res, next) => {
    // let accessToken = null
    //
    // if (req.get('Authorization') && req.get('Authorization').split(' ')[0] === 'Bearer')
    //     accessToken = req.get('authorization').split(' ')[1]
    // else
    //     accessToken = req.query.accessToken || req.get('x-access-token')

    let accessToken = req.get('x-access-token')

    if(!accessToken) {
        res.status(401)
        throw new Error('No authentication token, access denied')
    }

    try {
        var decoded = jwt.verify(accessToken, CF.jwt.secret_str)
        req.userId = decoded.data.userId
        next()
    } catch (err) {
        res.status(401)
        throw new Error('Token verification failed, authorization denied')
    }
})


module.exports = {
    authRequired
}
