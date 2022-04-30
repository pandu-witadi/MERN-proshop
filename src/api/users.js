//
//
const asyncHandler = require('express-async-handler')
const CF = require('../config/default')
const User = require('../models/User')
const {
    passwordHash,
    comparePassword,
    createToken
} = require('../utils/auth')


const register = asyncHandler( async (req, res) => {
    const { email, password, name } = req.body

    let userExist = await User.findOne({ email: email })
    if (userExist) {
        res.status(401)
        throw new Error('email already registered')
    }

    let user = await User.create({
        email: email,
        hashPassword: await passwordHash(password),
        name: name
    })
    if (!user) {
        res.status(40)
        throw new Error('invalid user data')
    } else {
        let accessToken = createToken({ userId: user._id })
        let { hashPassword, __v, ...others } = user._doc

        return res.status(200).json({
            ...others,
            accessToken: accessToken
        })
    }
})


const login = asyncHandler( async (req, res) => {

    const { email, password } = req.body

    let user = await User.findOne({ email: email })
    if (!user || !(await comparePassword(password, user.hashPassword))) {
        res.status(401)
        throw new Error('invalid credentials')
    }

    let accessToken = createToken({ userId: user._id })
    let { hashPassword, __v, ...others } = user._doc
    return res.status(200).json({
        ...others,
        accessToken: accessToken
    })
})

const currentUser = asyncHandler( async (req, res) => {
        let user = await User.findById(req.userId).select('-password')
        let { hashPassword, __v, ...others } = user._doc
        return res.status(200).json({ ...others })
})


module.exports = {
    register,
    login,
    currentUser
}
