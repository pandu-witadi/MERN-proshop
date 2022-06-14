//
//
//
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const CF = require('../config/default')


const passwordHash = async(rawPassword) => {
    const saltLength =  process.env.saltLength || CF.jwt.saltLength
    let salt = await bcrypt.genSalt(saltLength)
    return await bcrypt.hash(rawPassword, salt)
}

const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash)
}

const createToken = (id) => {
    const secret_str =  process.env.secret_str || CF.jwt.secret_str
    const token_exp = process.env.token_exp || CF.jwt.token_exp
    return jwt.sign( { id }, secret_str, { expiresIn: token_exp } )
}

const decodeToken = (accessToken) => {
    const secret_str =  process.env.secret_str || CF.jwt.secret_str
    return jwt.verify(accessToken, secret_str)
}

module.exports = {
    passwordHash,
    comparePassword,
    createToken,
    decodeToken
}
