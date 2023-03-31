import express from 'express'
import friendshipController from '../controllers/friendship'
import userMiddleware from '../middlewares/users'
import Users from '../models/users'

const friendshipRouter = express.Router()

friendshipRouter.post(
  '/',
  userMiddleware.M_authentication,
  userMiddleware.M_checkDoubleID(Users),
  userMiddleware.M_checkDoubleIDFriendship,
  friendshipController.createFriendship
)
friendshipRouter.get(
  '/',
  userMiddleware.M_authentication,
  userMiddleware.M_authorization,
  friendshipController.getAllFriendship
)
friendshipRouter.get(
  '/:id',
  userMiddleware.M_authentication,
  userMiddleware.M_checkID(Users),
  friendshipController.getAllFriendofTheUser
)
friendshipRouter.put('/', userMiddleware.M_authentication, friendshipController.updateFriendship)
friendshipRouter.delete('/', userMiddleware.M_authentication, friendshipController.deleteFriendship)

export default friendshipRouter
