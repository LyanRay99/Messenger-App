import { Request, Response } from 'express'
import { MessagesAttributes } from '../../types/messages.type'
import { message } from '../../constants/message.constant'
import messageService from '../../services/messages'

//* Completed: create friendship
export const createMessage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userA, userB, content }: { userA: object; userB: object; content: string } = req.body

    const newMessage = await messageService.createMessage(userA, userB, content)

    return res.status(200).send({
      status: 200,
      message: message.create_message_success,
      data: newMessage
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.create_message_faild,
      errors: error
    })
  }
}

//* Completed: get all messages
export const getAllMessages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const messages: MessagesAttributes[] = await messageService.getAllMessages()

    return res.status(200).send({
      status: 200,
      message: message.get_message_success,
      data: messages
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_message_faild,
      errors: error
    })
  }
}

//* Completed: get all messages of the user send & received
export const getMessageSendAndReceived = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params //* id of user need get data

    const messages: MessagesAttributes[] = await messageService.getMessageSendAndReceived(id)

    return res.status(200).send({
      status: 200,
      message: message.get_message_detail_success,
      data: messages
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_message_detail_faild,
      errors: error
    })
  }
}

//* Completed: get all messages of the user send
export const getMessageSend = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params //* id of user need get data

    //* service get user detail data
    const messages: MessagesAttributes[] = await messageService.getMessageSend(id)

    return res.status(200).send({
      status: 200,
      message: message.get_message_detail_success,
      data: messages
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_message_detail_faild,
      errors: error
    })
  }
}

//* Completed: get all messages of the user received
export const getMessageReceived = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params //* id of user need get data

    //* service get user detail data
    const messages: MessagesAttributes[] = await messageService.getMessageReceived(id)

    return res.status(200).send({
      status: 200,
      message: message.get_message_detail_success,
      data: messages
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_message_detail_faild,
      errors: error
    })
  }
}

//* Completed: update message
export const updateMessage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params //* id of user need get message data
    const { content }: { content: string } = req.body

    const messageUpdate = await messageService.updateMessage(id, content)

    return res.status(200).send({
      status: 200,
      message: message.update_message_success,
      data: messageUpdate
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.update_message_faild,
      errors: error
    })
  }
}

//* Completed: delete message
export const deleteMessage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params //* id of user need get message data
    const messageDelete = await messageService.deleteMessage(id)

    return res.status(200).send({
      status: 200,
      message: message.delete_message_success,
      data: messageDelete
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.delete_message_faild,
      errors: error
    })
  }
}
