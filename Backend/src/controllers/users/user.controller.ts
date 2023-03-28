import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from '../../models/Users'
import { UsersAttributes } from './../../types/user.type'

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: UsersAttributes = req.body
    //* create 1 chain to encode password
    const salt = bcrypt.genSaltSync(10)

    //* encode salt + password
    const hashPassword = bcrypt.hashSync(user.password, salt)

    const newUser = await Users.create({
      username: user.username,
      password: hashPassword,
      email: user.email,
      full_name: user.full_name,
      sex: user.sex,
      address: user.address,
      birthday: user.birthday,
      phone_number: user.phone_number
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

export const login = async (req: Request, res: Response) => {
  try {
    const user: UsersAttributes = req.body

    // //* create token by jsonwebtoken package
    const token = jwt.sign({ username: user.username, password: user.password }, 'secretKey', {
      expiresIn: 60 * 60 //* time expired of token (here setup 1 hour)
    })

    const userData = await Users.findOne({
      where: {
        username: user.username
      }
    })

    return res.status(200).send({
      status: 200,
      message: 'Login success',
      data: {
        token: token,
        userData: userData
      }
    })
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: 'Login failed',
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
