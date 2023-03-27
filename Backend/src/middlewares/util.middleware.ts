import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import Users from '../models/Users'
import { validateRegister } from '../validations/user.validate'

//* check register data
export const M_checkRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.body

  //* validate register data
  const valid = await validateRegister(req.body)

  //* check username or email exits?
  const check = await Users.findOne({
    where: {
      [Op.or]: [
        {
          email
        },
        {
          username
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
