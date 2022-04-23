//
//
const mongoose = require('mongoose')


const objSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    isAdmin : {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true,
    collection: 'user'
})

module.exports = mongoose.model('User', objSchema)
