import express from 'express'
import userController from '../controllers/users'
import {
  M_checkRegister,
  M_checkLogin,
  M_checkID,
  M_authentication,
  M_authorization
} from '../middlewares/users/util.middleware'

const userRouter = express.Router()

userRouter.post('/register', M_checkRegister, userController.register)
userRouter.post('/login', M_checkLogin, userController.login)
userRouter.get('/', M_authentication, M_authorization, userController.getAllUser)
userRouter.get('/:id', M_authentication, M_checkID, userController.getUserDetail)

export default userRouter
