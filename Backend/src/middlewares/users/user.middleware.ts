import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import multer from 'multer'
import mkdirp from 'mkdirp'
import Users from '../../models/users'
import { validateRegister } from '../../validations/user.validate'
import { UsersAttributes, UsersAttributesChangePassword } from '../../types/user.type'
import { message } from '../../constants/message.constant'

//* Completed: check register data
export const M_checkRegister = async (req: Request, res: Response, next: NextFunction) => {
  const user: UsersAttributes = req.body

  //* validate register data
  const valid = await validateRegister(user)

  //* check username or email exits?
  const check = await Users.findOne({
    where: {
      [Op.or]: [
        {
          email: user.email
        },
        {
          username: user.username
        }
      ]
    }
  })

  valid.error
    ? res.status(409).send({
        status: 409,
        message: message.data_invalid
      })
    : check
    ? res.status(409).send({
        status: 409,
        message: message.email_or_username_exist
      })
    : next()
}

//* Completed: check login data
export const M_checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const user: UsersAttributes = req.body

  //* check email & username existed ?
  const userData = await Users.findOne({
    where: {
      username: user.username
    }
  })

  if (userData === null) {
    return res.status(404).send({
      status: 404,
      message: message.username_not_exist
    })
  }

  //* check password (password user request & password in db)
  const isAuthentication: boolean = bcrypt.compareSync(user.password, userData.password)

  isAuthentication
    ? next()
    : res.status(401).send({
        status: 401,
        message: message.incorrect_password
      })
}

//* Completed: check id existed ?
export const M_checkID = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  console.log(111)

  const check = await Users.findOne({
    where: {
      id
    }
  })

  check
    ? next()
    : res.status(404).send({
        status: 404,
        message: message.id_not_exist
      })
}

//* Completed: check authentication
export const M_authentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token')

  try {
    //* encode token to check user authenticated ?
    const isAuthen: string | jwt.JwtPayload = jwt.verify(token as string, 'secretKey')

    isAuthen
      ? next()
      : res.status(401).send({
          status: 401,
          message: message.not_logged_in,
          errors: isAuthen
        })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: message.error_authentication,
      errors: error
    })
  }
}

//* Completed: check authorization
export const M_authorization = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body

  const userData = await Users.findOne({
    where: {
      id
    }
  })

  //* check role of user's Admin ?
  if (userData?.role === 'Admin') {
    next()
  } else {
    res.status(403).send({
      status: 403,
      message: message.error_authorization
    })
  }
}

//* Completed: check current password & validate new password
export const M_checkCurrentPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const user: UsersAttributesChangePassword = req.body

  const userData = await Users.findOne({
    where: {
      id
    }
  })

  if (userData) {
    //* check password (password user request & password in db)
    const isAuthentication: boolean = bcrypt.compareSync(user.old_password, userData.password)

    isAuthentication
      ? next()
      : res.status(401).send({
          status: 401,
          message: message.incorrect_password
        })
  }
}

//* Completed: validate new password
export const M_validateNewPassword = async (req: Request, res: Response, next: NextFunction) => {
  const user: UsersAttributesChangePassword = req.body

  const checkPW = Joi.object({
    new_password: Joi.string().min(8).max(10).required(),
    confirm_password: Joi.ref('password')
  })

  const check = checkPW.validate({
    new_password: user.new_password,
    confirm_password: user.confirm_password
  })

  check.error
    ? res.status(409).send({
        status: 409,
        message: message.incorrect_password
      })
    : next()
}

//* Completed: upload avatar
export const M_uploadAvatar = (type: string) => {
  //* create folder before save image
  const createFolder = mkdirp.sync(`./public/images/${type}`)

  //* declare storage engine of Multer
  const storage = multer.diskStorage({
    //* setup path save image
    destination: (req, res, callback) => {
      callback(null, `./public/images/${type}`)
    },

    //* set name of image
    filename: (req, file, callback) => {
      callback(null, Date.now() + '_' + file.originalname)
    }
  })

  //* declare middleware upload
  const upload = multer({
    storage: storage,

    //* check extension of file image
    fileFilter: (req, file, callback) => {
      const extensionImage = ['.png', '.jpg']
      const extension = file.originalname.slice(-4)

      extensionImage.includes(extension) ? callback(null, true) : callback(new Error(message.extension_file_invalid))
    },

    //* check size of image <= 1MB
    limits: {
      fileSize: 1000000
    }
  })

  return upload.single(type)
}
