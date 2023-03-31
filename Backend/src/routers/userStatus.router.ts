import express from 'express'
import userStatusController from '../controllers/user_statuses'
import userMiddleware from '../middlewares/users'
import UserStatuses from '../models/user_statuses'

const userStatusRouter = express.Router()

userStatusRouter.get(
  '/',
  userMiddleware.M_authentication,
  userMiddleware.M_authorization,
  userStatusController.getAllUserStatus
)
userStatusRouter.get(
  '/:id',
  userMiddleware.M_authentication,
  userMiddleware.M_checkFriendship,
  userStatusController.getUserStatusDetail
)
userStatusRouter.put(
  '/:id',
  userMiddleware.M_authentication,
  userMiddleware.M_authorization,
  userMiddleware.M_checkID(UserStatuses),
  userStatusController.getUserStatusDetail
)

export default userStatusRouter
