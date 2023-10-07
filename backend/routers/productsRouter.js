const express = require('express')
const { productsController } = require('../controllers/')
const routers = express.Router()

routers.get('/get', productsController.getData)
routers.post('/add-products', productsController.addData)
routers.patch('/edit-products/:id', productsController.editData)
routers.delete('/delete-products/:id', productsController.deleteData)

module.exports = routers