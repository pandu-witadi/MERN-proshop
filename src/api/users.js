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

// desc:    register new user
// route:   POST /api/users
// access:  public
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
        res.status(401)
        throw new Error('invalid user data')
    } else {
        let accessToken = createToken({ userId: user._id })
        let { hashPassword, __v, ...others } = user._doc

        return res.status(201).json({
            ...others,
            accessToken: accessToken
        })
    }
})

// desc:    login user
// route:   POST /api/users/login
// access:  public
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

const getUserById = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    if (user) {
        let { hashPassword, __v, ...others } = user._doc
        return res.status(200).json({ ...others })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


const getUserProfile = asyncHandler( async (req, res) => {
    let user = await User.findById(req.userId)
    if (user) {
        let { hashPassword, __v, ...others } = user._doc
        return res.status(200).json({ ...others })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler( async (req, res) => {
    let user = await User.findById(req.userId)
    if (user) {
        let { email, password, name } = req.body
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            user.hashPassword = await passwordHash(password)
        }
        let updatedUser = await user.save()
        let accessToken = createToken({ userId: updatedUser._id })
        let { hashPassword, __v, ...others } = updatedUser._doc
        return res.status(200).json({
            ...others,
            accessToken: accessToken
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

module.exports = {
    register,
    login,
    getUserById,
    getUserProfile,
    updateUserProfile
}
