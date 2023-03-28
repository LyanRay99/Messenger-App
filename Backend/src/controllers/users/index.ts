import { register, login, getUserDetail, getAllUser } from './user.controller'

const userController = {
  register: register,
  login: login,
  getUserDetail: getUserDetail,
  getAllUser: getAllUser
}

export default userController
