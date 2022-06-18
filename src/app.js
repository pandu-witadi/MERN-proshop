//
//
const express = require('express')
const path = require('path')
const cors = require('cors')

const { notFound, errorHandler } = require('./middleware/error')
const CF = require('./config/default')


const app = express()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )


//these 3 lines make sure that Angular/VUe/React and express app are coming from the same server
const frontEndPath = path.join(__dirname, CF.frontEnd.path)
app.use(express.static(frontEndPath))
app.get('/', function(req, res) {
    res.sendFile('index.html',  { root: frontEndPath } )
})

console.log(path.join(__dirname, '..', 'uploads'))
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// API
app.use(CF.server.apiPath, require('./api/index'))
app.use(notFound)
app.use(errorHandler)


module.exports = app
