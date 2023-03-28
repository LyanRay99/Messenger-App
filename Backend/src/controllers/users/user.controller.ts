import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import Users from '../../models/users'
import { UsersAttributes, UsersAttributesUpdates } from './../../types/user.type'
import { URL } from '../../constants/url'

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: UsersAttributes = req.body
    //* create 1 chain to encode password
    const salt: string = bcrypt.genSaltSync(10)

    //* encode salt + password
    const hashPassword: string = bcrypt.hashSync(user.password, salt)

    const newUser: Users = await Users.create({
      id: nanoid(), // create id nano
      username: user.username,
      password: hashPassword,
      email: user.email,
      full_name: user.full_name,
      sex: user.sex,
      address: user.address,
      birthday: user.birthday,
      phone_number: user.phone_number,
      role: user?.role
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

    //* create token by jsonwebtoken package
    const token: string = jwt.sign({ username: user.username, password: user.password }, 'secretKey', {
      expiresIn: 60 * 60 //* time expired of token (here setup 1 hour)
    })

    const userData: Users | null = await Users.findOne({
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

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user: Users[] = await Users.findAll()

    return res.status(200).send({
      status: 200,
      message: 'Get user success',
      data: user
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Get user failed',
      errors: error
    })
  }
}

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user: Users | null = await Users.findOne({
      where: {
        id
      }
    })

    return res.status(200).send({
      status: 200,
      message: 'Get user detail success',
      data: user
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Get user detail failed',
      errors: error
    })
  }
}

//* using update & change password
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user: UsersAttributesUpdates = req.body

    const userData = await Users.update(
      {
        password: user.password,
        full_name: user.full_name,
        sex: user.sex,
        address: user.address,
        birthday: user.birthday,
        phone_number: user.phone_number,
        role: user.role,
        active: user.active
      },
      {
        where: {
          id
        }
      }
    )

    const userDataUpdate: Users | null = await Users.findOne({
      where: {
        id
      }
    })

    return res.status(200).send({
      status: 200,
      message: 'Update user success',
      data: userDataUpdate
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Update user failed',
      errors: error
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const userData: number = await Users.destroy({
      where: {
        id
      }
    })

    return res.status(200).send({
      status: 200,
      message: 'Delete user success',
      data: userData
    })
  } catch (error) {
    console.log(111)
    res.status(500).send({
      status: 500,
      message: 'Delete user failed',
      errors: error
    })
  }
}

export const uploadAvatar = async (req: Request, res: Response) => {
  //* get data in request
  const { file, body } = req
  console.log('🚀 ~ file: user.controller.ts:191 ~ uploadAvatar ~ body:', body)
  console.log('🚀 ~ file: user.controller.ts:191 ~ uploadAvatar ~ req:', req)

  // //* create path of image
  const urlImg: string = `${URL}${file?.path}`

  // //* find user info
  const userInfo = await Users.findOne({
    where: {
      id: body.id
    }
  })

  if (userInfo?.avatar) {
    //* update & save avatar of user
    userInfo.avatar = urlImg
    await userInfo.save()

    return res.status(200).send({
      message: 'feature upload avatar',
      user: userInfo,
      file: file
    })
  } else {
    return res.status(500).send({
      message: 'upload avatar failed'
    })
  }
}
