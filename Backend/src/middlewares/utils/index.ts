import {
  M_checkRegister,
  M_checkLogin,
  M_authentication,
  M_authorization,
  M_checkIdParams,
  M_checkIdBody,
  M_checkCurrentPassword,
  M_uploadAvatar,
  M_validateNewPassword,
  M_checkDoubleID,
  M_checkDoubleIDFriendship,
  M_checkFriendship
} from './util.middleware'

const utilMiddleware = {
  M_checkRegister,
  M_checkLogin,
  M_authentication,
  M_authorization,
  M_checkIdParams,
  M_checkIdBody,
  M_checkCurrentPassword,
  M_uploadAvatar,
  M_validateNewPassword,
  M_checkDoubleID,
  M_checkDoubleIDFriendship,
  M_checkFriendship
}

export default utilMiddleware
