const express = require("express")
const app = express()
const cors = require("cors")

const PORT = 2000
const db = require("./models")

const { userRouter } = require("./router")

const corsOption = {
    origin: "http://127.0.0.1:3000",
    methods: "GET,POST",
    credentials: true,
}
app.use(cors(corsOption))

try {
    db.sequelize.sync({ alter: true })
    console.log("database connected")
} catch (error) {
    console.log(error)
}

app.use("/users", userRouter)
const { productsRouter } = require('./routers')
const { usersRouter } = require('./routers')
const { cartsRouter } = require('./routers')

app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/carts', cartsRouter)

app.get("/", (req, res) => {
    return res.status(200).json("tessss")
})

app.listen(PORT, () => {
    console.log("Server running on port ", PORT)
})