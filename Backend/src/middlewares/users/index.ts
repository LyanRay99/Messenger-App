import {
  M_checkRegister,
  M_checkLogin,
  M_authentication,
  M_authorization,
  M_checkID,
  M_checkCurrentPassword,
  M_uploadAvatar,
  M_validateNewPassword
} from './user.middleware'

const userMiddleware = {
  M_checkRegister,
  M_checkLogin,
  M_authentication,
  M_authorization,
  M_checkID,
  M_checkCurrentPassword,
  M_uploadAvatar,
  M_validateNewPassword
}

export default userMiddleware
