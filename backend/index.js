const express = require("express")
const app = express()
app.use(express.json())
const PORT = 2000
const db = require("./models")
const cors = require("cors")

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

app.get("/", (req, res) => {
  return res.status(200).json("tessss")
})

app.listen(PORT, () => {
  console.log("Server running on port ", PORT)
})
