const router = require("express").Router()
const { userController } = require("./../controller")
const verifyToken = require("./../middleware/verifyToken")

// router.get("/login", userController.login)
router.post("/register", userController.register)
router.get("/users", verifyToken, userController.users)
router.get("/login", userController.login)

module.exports = router
