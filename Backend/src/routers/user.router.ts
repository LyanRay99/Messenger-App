import express from 'express'
import userController from '../controllers/users'
import userMiddleware from '../middlewares/users'

const userRouter = express.Router()

userRouter.post('/register', userMiddleware.M_checkRegister, userController.register)
userRouter.post('/login', userMiddleware.M_checkLogin, userController.login)
userRouter.post(
  '/upload-avatar',
  userMiddleware.M_authentication,
  userMiddleware.M_uploadAvatar('avatars'),
  userController.uploadAvatar
)
userRouter.get(
  '/',
  userMiddleware.M_authentication,
  userMiddleware.M_authorization,
  userController.getAllUser
)
userRouter.get(
  '/:id',
  userMiddleware.M_authentication,
  userMiddleware.M_checkID,
  userController.getUserDetail
)
userRouter.put(
  '/:id',
  userMiddleware.M_authentication,
  userMiddleware.M_checkID,
  userController.updateUser
)
userRouter.put(
  '/change-password/:id',
  userMiddleware.M_authentication,
  userMiddleware.M_checkID,
  userMiddleware.M_checkCurrentPassword,
  userController.updateUser
)
userRouter.delete(
  '/:id',
  userMiddleware.M_authentication,
  userMiddleware.M_authorization,
  userMiddleware.M_checkID,
  userController.deleteUser
)

export default userRouter
