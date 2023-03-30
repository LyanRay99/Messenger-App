import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import Users from '../../models/users'
import { UsersAttributes } from '../../types/user.type'
import { URL } from '../../constants/url.constant'

//* Completed: register
export const register = async (user: UsersAttributes): Promise<UsersAttributes> => {
  //* create 1 chain to encode password
  const salt: string = bcrypt.genSaltSync(10)

  //* encode salt + password
  const hashPassword: string = bcrypt.hashSync(user.password, salt)

  //* create new user
  const newUser: UsersAttributes = await Users.create({
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
  return newUser
}

//* Completed: login
export const login = async ({ user }: { user: UsersAttributes }): Promise<Object> => {
  //* create token by jsonwebtoken package
  const token: string = jwt.sign({ username: user.username, password: user.password }, 'secretKey', {
    expiresIn: 60 * 60 //* time expired of token (here setup 1 hour)
  })

  //* find data user by username
  const userData: Users | null = await Users.findOne({
    where: {
      username: user.username
    }
  })

  return {
    token: token,
    useData: userData
  }
}

//* Completed: get all users
export const getAllUser = async (): Promise<UsersAttributes[]> => {
  const user: UsersAttributes[] = await Users.findAll()

  return user
}

//* Completed: get detail user
export const getUserDetail = async (id: string): Promise<UsersAttributes> => {
  //* find data user by id
  const user: UsersAttributes = (await Users.findOne({
    where: {
      id
    }
  })) as UsersAttributes

  return user
}

//* Completed: update user (using update & change password)
export const updateUser = async (id: string, user: UsersAttributes): Promise<UsersAttributes> => {
  await Users.update(
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

  const userDataUpdate: UsersAttributes = (await Users.findOne({
    where: {
      id
    }
  })) as UsersAttributes

  return userDataUpdate
}

//* Completed: delete user
export const deleteUser = async (id: string): Promise<number> => {
  const userData: number = await Users.destroy({
    where: {
      id
    }
  })

  return userData
}

//* Completed: upload avatar
export const uploadAvatar = async (file: any, id: string) => {
  //* create path of image
  const urlImg: string = `${URL}${file?.path}`

  //* find user info
  const userInfo = await Users.findOne({
    where: {
      id: id
    }
  })

  if (userInfo?.avatar) {
    //* update & save avatar of user
    userInfo.avatar = urlImg
    await userInfo.save()

    return {
      userInfo: userInfo,
      file: file
    }
  }
}
