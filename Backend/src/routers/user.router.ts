import express from 'express'
import userController from '../controllers/users'
import { M_checkEmailExist } from '../middlewares/util.middleware'

const userRouter = express.Router()

userRouter.post('/register', M_checkEmailExist, userController.register)

export default userRouter
