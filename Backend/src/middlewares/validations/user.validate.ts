import Joi from 'joi'
import { UsersAttributes } from '../../types/user.type'

export const validateRegister = async (userData: UsersAttributes) => {
  const check = Joi.object({
    username: Joi.string().alphanum().min(8).max(15).required(),
    password: Joi.string().min(8).max(10).required(),
    confirm_password: Joi.ref('password'),
    email: Joi.string().email().required(),
    full_name: Joi.string().alphanum().min(1).max(50).required(),
    sex: Joi.string().required(),
    address: Joi.string().alphanum().required(),
    birthday: Joi.date().required(),
    phone_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    role: Joi.string()
  })

  return check.validate(userData)
}
