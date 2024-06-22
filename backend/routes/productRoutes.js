const express = require('express')
const isAuth = require('../middlewares/isAuth')
const { createProduct, getAllProducts, getSingleProduct, deleteProduct } = require('../controllers/productController')
const uploadImage = require('../middlewares/uploadImage')

const productRouter = express.Router()

productRouter.post("/new",isAuth,uploadImage,createProduct)
productRouter.get("/all",getAllProducts)
productRouter.get("/:id",getSingleProduct)
productRouter.delete("/delete/:id",isAuth,deleteProduct)

module.exports = productRouter