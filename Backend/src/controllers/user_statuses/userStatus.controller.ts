import { Request, Response } from 'express'
import { UserStatusesAttributes } from './../../types/user.type'
import { message } from '../../constants/message.constant'
import userStatusService from '../../services/user_statuses'

//* Completed: get all users
export const getAllUserStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userStatus: UserStatusesAttributes[] = await userStatusService.getAllUserStatus()

    return res.status(200).send({
      status: 200,
      message: message.get_user_status_success,
      data: userStatus
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_user_status_faild,
      errors: error
    })
  }
}

//* Completed: get detail user
export const getUserStatusDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: user_id } = req.params //* id of user need get data
    const { friend_id } = req.body //* id of user handle get data (to check authorization)

    //* TODO: service check relation of 2 users

    //* service get user detail data
    const userStatus: UserStatusesAttributes = await userStatusService.getUserStatusDetail(user_id)

    return res.status(200).send({
      status: 200,
      message: message.get_user_status_detail_success,
      data: userStatus
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_user_status_detail_faild,
      errors: error
    })
  }
}

//* Completed: update user (using update & change password)
export const updateUserStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userStatus: UserStatusesAttributes = req.body

    const userData: void = await userStatusService.updateUserStatus(userStatus)

    return res.status(200).send({
      status: 200,
      message: message.update_user_status_success,
      data: userData
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.update_user_status_faild,
      errors: error
    })
  }
}
