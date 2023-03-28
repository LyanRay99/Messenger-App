import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import Users from '../models/Users'
import { validateRegister } from '../validations/user.validate'
import { UsersAttributes } from '../types/user.type'

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
        message: 'Data invalid'
      })
    : check
    ? res.status(409).send({
        status: 409,
        message: 'Email or Username exist'
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
      message: 'Username not exist'
    })
  }

  //* check password (password user request & password in db)
  const isAuthentication: boolean = bcrypt.compareSync(user.password, userData.password)

  isAuthentication
    ? next()
    : res.status(401).send({
        status: 401,
        message: 'Password invalid'
      })
}
