import express from 'express'
import userController from '../controllers/users'
import { M_checkRegister, M_checkLogin } from '../middlewares/util.middleware'

const userRouter = express.Router()

userRouter.post('/register', M_checkRegister, userController.register)
userRouter.post('/login', M_checkLogin, userController.login)

export default userRouter
