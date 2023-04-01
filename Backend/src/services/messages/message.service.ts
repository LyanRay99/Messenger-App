import { nanoid } from 'nanoid'
import { Op } from 'sequelize'
import { MessagesAttributes } from '../../types/messages.type'
import Messages from '../../models/messages'

//* Completed: create message
export const createMessage = async (
  userA: any,
  userB: any,
  content: string
): Promise<MessagesAttributes> =>
  await Messages.create({
    id: nanoid(),
    sender_id: userA.id,
    receiver_id: userB.id,
    content: content
  })

//* Completed: get all messages of the user
export const getAllMessages = async (): Promise<MessagesAttributes[]> => await Messages.findAll()

//* Completed: get all messages of the user send & received
export const getMessageSendAndReceived = async (user_id: string): Promise<MessagesAttributes[]> =>
  await Messages.findAll({
    where: {
      [Op.or]: [
        {
          sender_id: user_id
        },
        {
          receiver_id: user_id
        }
      ]
    }
  })

//* Completed: get all messages of the user send
export const getMessageSend = async (user_id: string): Promise<MessagesAttributes[]> =>
  await Messages.findAll({
    where: {
      sender_id: user_id
    }
  })

//* Completed: get all messages of the user received
export const getMessageReceived = async (user_id: string): Promise<MessagesAttributes[]> =>
  await Messages.findAll({
    where: {
      receiver_id: user_id
    }
  })

//* Completed: update message
export const updateMessage = async (id: string, content: string) =>
  await Messages.update(
    {
      content
    },
    {
      where: {
        id
      }
    }
  )

//* Completed: delete message
export const deleteMessage = async (id: string) =>
  await Messages.destroy({
    where: {
      id
    }
  })
