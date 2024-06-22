const express = require('express')
const isAuth = require('../middlewares/isAuth')
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController')
const cartRouter = express.Router()

cartRouter.post("/add",isAuth,addToCart)
cartRouter.delete("/remove",isAuth,removeFromCart)
cartRouter.get("/get",isAuth,getCart)


module.exports = cartRouter