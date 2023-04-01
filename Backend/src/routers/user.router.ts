import express from 'express'
import userController from '../controllers/users'
import utilMiddleware from '../middlewares/utils'
import Users from '../models/users'

const userRouter = express.Router()

userRouter.post('/register', utilMiddleware.M_checkRegister, userController.register)
userRouter.post('/login', utilMiddleware.M_checkLogin, userController.login)
userRouter.post(
  '/upload-avatar',
  utilMiddleware.M_authentication,
  utilMiddleware.M_uploadAvatar('avatars'),
  userController.uploadAvatar
)
userRouter.get(
  '/',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  userController.getAllUser
)
userRouter.get(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdParams(Users),
  userController.getUserDetail
)
userRouter.put(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdParams(Users),
  userController.updateUser
)
userRouter.put(
  '/change-password/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdParams(Users),
  utilMiddleware.M_checkCurrentPassword,
  userController.updateUser
)
userRouter.delete(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  utilMiddleware.M_checkIdParams(Users),
  userController.deleteUser
)

export default userRouter
