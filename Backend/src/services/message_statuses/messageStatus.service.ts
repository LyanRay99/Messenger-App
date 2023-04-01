import MessageStatuses from '../../models/message_status'
import Users from '../../models/users'
import { MessageStatusAttributes } from '../../types/messages.type'

//* Completed: create status of message
export const createMessageStatus = async (message_id: string): Promise<MessageStatusAttributes> =>
  await MessageStatuses.create({
    message_id: message_id,
    read_status: false
  })

//* Completed: get all message statuses
export const getAllMessageStatuses = async (): Promise<MessageStatusAttributes[]> =>
  await MessageStatuses.findAll()

//* Completed: get all message statuses of the user
export const getAllMessageStatusesOfUser = async (
  user_id: string
): Promise<MessageStatusAttributes[]> =>
  await MessageStatuses.findAll({
    include: [
      {
        model: Users,
        as: 'sender',
        where: {
          id: user_id
        }
      },
      {
        model: Users,
        as: 'receiver',
        where: {
          id: user_id
        }
      },
      {
        model: MessageStatuses
      }
    ]
  })

//* Completed: update status of message
export const updateMessageStatus = async (
  message_id: string,
  read_status: boolean
): Promise<[affectedCount: number]> =>
  await MessageStatuses.update(
    {
      read_status: read_status
    },
    {
      where: {
        message_id: message_id
      }
    }
  )

//* Completed: delete status of message
export const deleteMessageStatus = async (message_id: string): Promise<number> =>
  await MessageStatuses.destroy({
    where: {
      message_id: message_id
    }
  })
