import express from 'express'
import messageController from '../controllers/messages'
import utilMiddleware from '../middlewares/utils'
import Users from '../models/users'
import Messages from '../models/messages'
import messageStatusController from '../controllers/message_statuses'

const messageRouter = express.Router()

messageRouter.get(
  '/',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  messageStatusController.getAllMessageStatuses
)

messageRouter.get(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdParams(Users),
  messageStatusController.getAllMessageStatusesOfUser
)

messageRouter.put(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdBody(Messages),
  messageStatusController.updateMessageStatus
)

export default messageRouter
