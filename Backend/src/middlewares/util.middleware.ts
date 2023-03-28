import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import Users from '../models/Users'
import { validateRegister } from '../validations/user.validate'
import { UsersAttributes } from '../types/user.type'

//* check register data
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
