const express = require('express')
const { register, verifyUser, login, myProfile } = require('../controllers/authController')
const isAuth = require('../middlewares/isAuth')

const authRouter = express.Router()


authRouter.post("/register",register)
authRouter.post("/verify",verifyUser)
authRouter.post("/login",login)
authRouter.get("/profile",isAuth,myProfile)

module.exports = authRouter