import {
  M_checkRegister,
  M_checkLogin,
  M_authentication,
  M_authorization,
  M_checkID,
  M_checkCurrentPassword,
  M_uploadAvatar,
  M_validateNewPassword,
  M_checkDoubleID,
  M_checkDoubleIDFriendship,
  M_checkFriendship
} from './user.middleware'

const userMiddleware = {
  M_checkRegister,
  M_checkLogin,
  M_authentication,
  M_authorization,
  M_checkID,
  M_checkCurrentPassword,
  M_uploadAvatar,
  M_validateNewPassword,
  M_checkDoubleID,
  M_checkDoubleIDFriendship,
  M_checkFriendship
}

export default userMiddleware
