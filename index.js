const express = require("express")
const app = express()
app.use(express.json())
const PORT = 2000
const db = require("./models")
const cors = require("cors")

const { userRouter } = require("./router")

try {
  db.sequelize.sync({ alter: true })
  console.log("database connected")
} catch (error) {
  console.log(error)
}

app.use("/user", userRouter)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)

app.get("/", (req, res) => {
  return res.status(200).json("tessss")
})

app.listen(PORT, () => {
  console.log("Server running on port ", PORT)
})
