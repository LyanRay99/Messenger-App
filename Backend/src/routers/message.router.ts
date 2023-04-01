import express from 'express'
import messageController from '../controllers/messages'
import utilMiddleware from '../middlewares/utils'
import Users from '../models/users'
import Messages from '../models/messages'

const messageRouter = express.Router()

messageRouter.post(
  '/',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkDoubleID(Users),
  utilMiddleware.M_checkFriendship,
  messageController.createMessage
)
messageRouter.get(
  '/',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  messageController.getAllMessages
)
messageRouter.get(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdParams(Users),
  messageController.getMessageSendAndReceived
)
messageRouter.get(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdParams(Users),
  messageController.getMessageSend
)
messageRouter.get(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkIdParams(Users),
  messageController.getMessageReceived
)
messageRouter.put(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  utilMiddleware.M_checkIdBody(Messages),
  messageController.updateMessage
)
messageRouter.delete(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  utilMiddleware.M_checkIdBody(Messages),
  messageController.deleteMessage
)

export default messageRouter
