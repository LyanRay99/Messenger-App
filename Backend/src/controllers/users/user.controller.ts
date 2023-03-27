import Users from '../../models/Users'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password, email, full_name, sex, address, birthday, phone_number } = req.body
    //* create 1 chain to encode password
    const salt = bcrypt.genSaltSync(10)

    //* encode salt + password
    const hashPassword = bcrypt.hashSync(password, salt)

    const newUser = await Users.create({
      username,
      password: hashPassword,
      email,
      full_name,
      sex,
      address,
      birthday,
      phone_number
    })

    return res.status(201).send({
      status: 201,
      message: 'Register success',
      data: newUser
    })
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: 'Register failed',
      errors: error
    })
  }
}

// * login
//* get detail
//* update profile
//* upload avatar
//* change password

// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await Users.findAll()
//     res.send(users)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// }

/**
 ** admin
 ** - create
 ** - get
 ** - update
 ** - delete
 */
