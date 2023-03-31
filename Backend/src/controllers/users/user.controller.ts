import { Request, Response } from 'express'
import { UsersAttributes, UserStatusesAttributes } from './../../types/user.type'
import { message } from '../../constants/message.constant'
import userService from '../../services/users'
import userStatusService from '../../services/user_statuses'

//* Completed: register
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: UsersAttributes = req.body

    //* service create new user
    const newUser: UsersAttributes = await userService.register(user)

    //* service create new user status
    const newUserStatus: UserStatusesAttributes = await userStatusService.createUserStatus(
      newUser.id
    )

    return res.status(201).send({
      status: 201,
      message: message.register_success,
      data: newUser,
      status_of_user: newUserStatus
    })
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: message.register_faild,
      errors: error
    })
  }
}

//* Completed: login
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: UsersAttributes = req.body

    //* service login
    const loginData: any = await userService.login({ user: user })

    //* update status of user when user login
    //* service get status
    const userStatusData = await userStatusService.getUserStatusDetail(loginData.userData.id)
    //* service update status
    await userStatusService.updateUserStatus(userStatusData)

    return res.status(200).send({
      status: 200,
      message: message.login_success,
      data: loginData
    })
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: message.login_faild,
      errors: error
    })
  }
}

//* Completed: get all users
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user: UsersAttributes[] = await userService.getAllUser()

    return res.status(200).send({
      status: 200,
      message: message.get_user_success,
      data: user
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: message.get_user_faild,
      errors: error
    })
  }
}

//* Completed: get detail user
export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    //* service
    const user: UsersAttributes = await userService.getUserDetail(id)

    return res.status(200).send({
      status: 200,
      message: message.get_user_detail_success,
      data: user
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: message.get_user_detail_faild,
      errors: error
    })
  }
}

//* Completed: update user (using update & change password)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user: UsersAttributes = req.body

    const userData: UsersAttributes = await userService.updateUser(id, user)

    return res.status(200).send({
      status: 200,
      message: message.update_user_success,
      data: userData
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: message.update_user_faild,
      errors: error
    })
  }
}

//* Completed: delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    //* delete user status
    await userStatusService.deleteUserStatus(id)

    //* delete user
    const userData: number = await userService.deleteUser(id)

    return res.status(200).send({
      status: 200,
      message: message.delete_user_success,
      data: userData
    })
  } catch (error) {
    console.log(111)
    res.status(500).send({
      status: 500,
      message: message.delete_user_faild,
      errors: error
    })
  }
}

//* Completed: upload avatar
export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    //* get data in request
    const { file, body } = req
    const id: string = body.id

    const userData = await userService.uploadAvatar(file, id)

    if (userData) {
      return res.status(200).send({
        message: message.upload_avatar_success,
        user: userData?.userInfo,
        file: userData?.file
      })
    } else {
      return res.status(500).send({
        message: message.upload_avatar_faild
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: message.upload_avatar_faild
    })
  }
}
