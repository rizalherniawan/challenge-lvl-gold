const auth = require('express')()
const authController = require('../../controller/auth')
const authentication = require('../../middleware/authentication')

auth.post('/register', authController.register)
auth.post('/login', authController.login)
auth.put('/update', authentication, authController.updateBio)


module.exports = auth