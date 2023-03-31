import { register, login, getUserDetail, getAllUser, updateUser, deleteUser, uploadAvatar } from './user.service'

const userService = {
  register,
  login,
  getUserDetail,
  getAllUser,
  updateUser,
  deleteUser,
  uploadAvatar
}

export default userService
