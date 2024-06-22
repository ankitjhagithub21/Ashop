require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const authRouter = require('./routes/authRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')

const app = express()

const port = process.env.PORT || 3000
connectDB()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)

app.use("/uploads",express.static("uploads"))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})