import { register, login, getUserDetail, getAllUser, updateUser, deleteUser } from './user.controller'

const userController = {
  register: register,
  login: login,
  getUserDetail: getUserDetail,
  getAllUser: getAllUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}

export default userController
