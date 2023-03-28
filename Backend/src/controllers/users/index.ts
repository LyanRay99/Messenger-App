import { register, login, getUserDetail, getAllUser, updateUser, deleteUser, uploadAvatar } from './user.controller'

const userController = {
  register: register,
  login: login,
  getUserDetail: getUserDetail,
  getAllUser: getAllUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  uploadAvatar: uploadAvatar
}

export default userController
