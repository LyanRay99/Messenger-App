import express from 'express'
import userRouter from './user.router'
import userStatusRouter from './userStatus.router'
import friendshipRouter from './friendship.router'

const rootRouter = express.Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/user-status', userStatusRouter)
rootRouter.use('/friendship', friendshipRouter)

export default rootRouter
