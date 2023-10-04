const express = require('express')
const { cartsController } = require('../controllers')
const routers = express.Router()

routers.get('/get', cartsController.getData)
routers.post('/add-carts', cartsController.addData)
routers.patch('/edit-carts/:id', cartsController.editData)
routers.delete('/delete-carts/:id', cartsController.deleteData)

module.exports = routers