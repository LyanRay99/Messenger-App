import express from 'express'
import userStatusController from '../controllers/user_statuses'
import utilMiddleware from '../middlewares/utils'
import UserStatuses from '../models/user_statuses'

const userStatusRouter = express.Router()

userStatusRouter.get(
  '/',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  userStatusController.getAllUserStatus
)
userStatusRouter.get(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkFriendship,
  userStatusController.getUserStatusDetail
)
userStatusRouter.put(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  utilMiddleware.M_checkID(UserStatuses),
  userStatusController.getUserStatusDetail
)

export default userStatusRouter
