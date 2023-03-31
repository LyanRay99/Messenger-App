import express from 'express'
import userRouter from './user.router'
import userStatusRouter from './userStatus.router'

const rootRouter = express.Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/user-status', userStatusRouter)

export default rootRouter
