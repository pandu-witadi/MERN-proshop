//
//
const asyncHandler = require('express-async-handler')
const CF = require('../config/default')


const getPaypalClientId = asyncHandler( async (req, res) => {
    return res.send(CF.PAYPAL.CLIENT_ID)
})


module.exports = {
    getPaypalClientId
}
