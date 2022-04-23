//
//
const express = require('express')
const path = require('path')
const cors = require('cors')

const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const CF = require('./config/default')


const app = express()

app.use( cors() )
// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))


//these 3 lines make sure that Angular and express app are coming from the same server
const frontEndPath = path.join(__dirname, CF.frontEnd.path)
app.use(express.static(frontEndPath))
app.get('/', function(req, res) {
    res.sendFile('index.html',  { root: frontEndPath } )
})


// API
app.use(CF.server.apiPath, require('./api/index'))
app.use(notFound)
app.use(errorHandler)


module.exports = app
