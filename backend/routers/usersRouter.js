const express = require('express')
const { usersController } = require('../controllers/')
const routers = express.Router()

routers.get('/get', usersController.getData)
routers.post('/add-users', usersController.addData)



module.exports = routers