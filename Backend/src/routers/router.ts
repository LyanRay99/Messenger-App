import express from 'express'
import userRouter from './user.router'
import userStatusRouter from './userStatus.router'
import friendshipRouter from './friendship.router'
import messageRouter from './message.router'

const rootRouter = express.Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/users/user-status', userStatusRouter)
rootRouter.use('/users/friendship', friendshipRouter)
rootRouter.use('/users/messages', messageRouter)

export default rootRouter
