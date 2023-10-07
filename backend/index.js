const express = require("express")
const cors = require("cors")

const PORT = 3300
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h4>Integrated mysql with express</h4>')
})

const { productsRouter } = require('./routers')
const { usersRouter } = require('./routers')
const { cartsRouter } = require('./routers')

app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/carts', cartsRouter)

app.listen(PORT, () => console.log('api running :', PORT));