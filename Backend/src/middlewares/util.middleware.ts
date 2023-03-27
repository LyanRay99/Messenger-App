import { Request, Response, NextFunction } from 'express'
import Users from '../models/Users'

//* check email exits
export const M_checkEmailExist = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body

  const check = await Users.findOne({
    where: { email }
  })

  check
    ? res.status(409).send({
        status: 409,
        message: 'Email exist'
      })
    : next()
}
