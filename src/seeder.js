//
//
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')

const users = require('./data/users')
const products = require('./data/products')

const { connectDB } = require('./config/db')

dotenv.config()

connectDB()

const importData = async() => {
    try {

        await Order.remove()
        await Product.remove()
        await User.remove()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.remove()
        await Product.remove()
        await User.remove()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
