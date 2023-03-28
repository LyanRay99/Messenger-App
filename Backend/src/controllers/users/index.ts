import { register, login, getUserDetail, getAllUser, updateUser } from './user.controller'

const userController = {
  register: register,
  login: login,
  getUserDetail: getUserDetail,
  getAllUser: getAllUser,
  updateUser: updateUser
}

export default userController
