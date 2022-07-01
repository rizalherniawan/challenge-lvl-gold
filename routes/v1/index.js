const v1 = require('express')()
const auth = require('./authRoutes')
const item = require('./item')
const order = require('./order')


v1.use('/auth', auth)
v1.use('/item', item)
v1.use('/order', order)

module.exports = v1