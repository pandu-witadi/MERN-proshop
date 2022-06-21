//
//
const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')

// desc:    create new order
// route:   POST /api/orders
// access:  private
const addOrderItems = asyncHandler( async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
     } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        return res.status(201).json(createdOrder)
    }
})

// @ desc:  get order by ID
// @route:  GET /api/orders/:id
// @access: private
const getOrderById = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        return res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @ desc:  update order to paid
// @route:  GET /api/orders/:id/pay
// @access: private
const updateOrderToPaidById = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedorder = await order.save()
        return res.json(updatedorder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @ desc:  update order to delivered
// @route:  GET /api/orders/:id/deliver
// @access: private/admin
const updateOrderToDelivered = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedorder = await order.save()
        return res.json(updatedorder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @ desc:  get login user order
// @route:  GET /api/orders/myorders
// @access: private
const getMyOrders = asyncHandler( async (req, res) => {
    const orders = await Order.find({ user:req.user._id })
    return res.json(orders)
})

// @ desc:  get all orders
// @route:  GET /api/orders
// @access: private/admin
const getOrders = asyncHandler( async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    return res.json(orders)
})


module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaidById,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
}
