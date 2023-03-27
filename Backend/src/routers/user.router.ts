import express from 'express'
import userController from '../controllers/users'
import { M_checkRegister } from '../middlewares/util.middleware'

const userRouter = express.Router()

userRouter.post('/register', M_checkRegister, userController.register)

export default userRouter
