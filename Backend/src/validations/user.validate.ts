import Joi from 'joi'

interface userData {
  username: string
  password: string
  confirm_password: string
  email: string
  full_name: string
  sex: string
  address: string
  birthday: string
  phone_number: string
}

export const validateRegister = async (userData: userData) => {
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
      .required()
  })

  return check.validate(userData)
}
