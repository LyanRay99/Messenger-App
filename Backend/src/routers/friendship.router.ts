import express from 'express'
import friendshipController from '../controllers/friendship'
import utilMiddleware from '../middlewares/utils'
import Users from '../models/users'

const friendshipRouter = express.Router()

friendshipRouter.post(
  '/',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkDoubleID(Users),
  utilMiddleware.M_checkDoubleIDFriendship,
  friendshipController.createFriendship
)
friendshipRouter.get(
  '/',
  utilMiddleware.M_authentication,
  utilMiddleware.M_authorization,
  friendshipController.getAllFriendship
)
friendshipRouter.get(
  '/:id',
  utilMiddleware.M_authentication,
  utilMiddleware.M_checkID(Users),
  friendshipController.getAllFriendofTheUser
)
friendshipRouter.put('/', utilMiddleware.M_authentication, friendshipController.updateFriendship)
friendshipRouter.delete('/', utilMiddleware.M_authentication, friendshipController.deleteFriendship)

export default friendshipRouter
