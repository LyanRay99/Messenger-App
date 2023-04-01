import { Request, Response } from 'express'
import { MessageStatusAttributes } from '../../types/messages.type'
import messageStatusService from '../../services/message_statuses'
import { message } from '../../constants/message.constant'

//* Completed: get all message statuses
export const getAllMessageStatuses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const messageStatus = await messageStatusService.getAllMessageStatuses()

    return res.status(200).json({
      status: 200,
      message: message.get_message_status_success,
      data: messageStatus
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.get_message_status_faild,
      errors: error
    })
  }
}

//* Completed: get all message statuses of the user
export const getAllMessageStatusesOfUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params //* id of user need get data
    const messageStatus = await messageStatusService.getAllMessageStatusesOfUser(id)

    return res.status(200).json({
      status: 200,
      message: message.get_message_status_detail_success,
      data: messageStatus
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.get_message_status_detail_faild,
      errors: error
    })
  }
}

//* Completed: update status of message
export const updateMessageStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { message_id, read_status } = req.body

    const updateMessageStatus = await messageStatusService.updateMessageStatus(
      message_id,
      read_status
    )

    return res.status(200).json({
      status: 200,
      message: message.update_message_status_success,
      data: updateMessageStatus
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.update_message_status_faild,
      errors: error
    })
  }
}
