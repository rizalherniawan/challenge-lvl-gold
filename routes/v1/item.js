const item = require('express')()
const itemController = require('../../controller/item')
const authentication = require('../../middleware/authentication')
const roleAuthorization = require('../../middleware/roleAuthorization')


item.post('/catalogue', authentication, roleAuthorization('ADMIN'), itemController.postItem)
item.delete('/catalogue/:id', authentication, roleAuthorization('ADMIN'), itemController.deleteItem)
item.put('/catalogue/:id', authentication, roleAuthorization('ADMIN'), itemController.updateItem)
item.get('/catalogue', itemController.lookItem)

module.exports = item