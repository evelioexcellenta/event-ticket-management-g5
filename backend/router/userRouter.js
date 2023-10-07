const express = require("express")
const router = express.Router()
const { userController } = require("./../controller")
const verifyToken = require("./../middleware/verifyToken")

// router.get("/login", userController.login)
router.post("/register", userController.register)
router.get("/users", verifyToken, userController.users)
router.post("/login", userController.login)

module.exports = router
