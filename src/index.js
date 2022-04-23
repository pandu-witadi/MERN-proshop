//
//

require('dotenv').config()

const mongoose = require('mongoose')
const { connectDB } = require('./config/db')
const app = require('./app')

const CF = require('./config/default')

connectDB()

let port = process.env.PORT || CF.server.port
let server = app.listen(port, () => {
    console.log(`${CF.app.name} server started - listening to port ${port}`)
})

// mongoose.connect(CF.mongoose.url + CF.mongoose.dbname, CF.mongoose.options)
//     .then(() => {
//         console.log('... db connect to ' + CF.mongoose.url + CF.mongoose.dbname)
//
//         let port = process.env.PORT || CF.server.port
//
//         server = app.listen(port, () => {
//             console.log(`${CF.app.name} server started - listening to port ${port}`)
//     })
// })
