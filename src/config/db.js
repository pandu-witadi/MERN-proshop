//
//
const mongoose = require('mongoose')
const CF = require('./default')


const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGO_URI || CF.mongoose.url
        const conn = await mongoose.connect(dbUrl,  CF.mongoose.options)

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}
