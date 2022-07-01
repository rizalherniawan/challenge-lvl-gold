const orderController = require('../../controller/order')
const order = require('express')()
const authentication = require('../../middleware/authentication')

order.use(authentication)
order.post('/cart', orderController.addToCart)
order.get('/cart', orderController.viewCart)
order.put('/cart', orderController.updateCart)
order.delete('/cart', orderController.deleteCart)
order.get('/cart/checkout', orderController.checkOutCart)

module.exports = order