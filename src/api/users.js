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

    const userExist = await User.findOne({ email: email })
    if (userExist) {
        res.status(401)
        throw new Error('email already registered')
    }

    const user = await User.create({
        email: email,
        hashPassword: await passwordHash(password),
        name: name
    })
    if (!user) {
        res.status(401)
        throw new Error('invalid user data')
    } else {
        const accessToken = createToken(user._id)
        const { hashPassword, __v, ...others } = user._doc

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

    let accessToken = createToken(user._id)
    let { hashPassword, __v, ...others } = user._doc
    return res.status(200).json({
        ...others,
        accessToken: accessToken
    })
})



// desc:    get user profile
// route:   GET /api/users/profile
// access:  private
const getUserProfile = asyncHandler( async (req, res) => {
    let user = await User.findById(req.user._id)
    if (user) {
        let { hashPassword, __v, ...others } = user._doc
        return res.status(200).json({ ...others })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler( async (req, res) => {
    let user = await User.findById(req.user._id)
    if (user) {
        let { email, password, name } = req.body
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            user.hashPassword = await passwordHash(password)
        }
        let updatedUser = await user.save()
        let accessToken = createToken(updatedUser._id)
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

// desc:    get all users
// route:   GET /api/users
// access:  private/admin
const getUsers = asyncHandler( async (req, res) => {
    let users = await User.find({})
    return res.json(users)
})

// desc:    delete user
// route:   DELETE /api/users/:id
// access:  private/admin
const deleteUser = asyncHandler( async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    await user.remove()
    return res.json({ 'message': 'user removed'})
})

// desc:    delete get user by id
// route:   GET /api/users/:id
// access:  private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    let { hashPassword, __v, ...others } = user._doc
    return res.json({ ...others })
})

// desc:    update user by id
// route:   PUT /api/users/:id/
// access:  private/admin
const updateUser = asyncHandler( async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
})

module.exports = {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}
