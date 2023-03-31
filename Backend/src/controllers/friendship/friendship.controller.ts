import { Request, Response } from 'express'
import { UserStatusesAttributes } from './../../types/user.type'
import { FriendshipAttributes } from '../../types/friendships.type'
import { message } from '../../constants/message.constant'
import userStatusService from '../../services/user_statuses'
import friendshipService from '../../services/friendships'
import Friendships from '../../models/friendships'

//* Completed: create friendship
export const createFriendship = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userA, userB }: { userA: object; userB: object } = req.body

    const newFriendship = await friendshipService.createFriendship(userA, userB)

    return res.status(200).send({
      status: 200,
      message: message.create_friendship_success,
      data: newFriendship
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.create_friendship_faild,
      errors: error
    })
  }
}

//* Completed: get all friendship
export const getAllFriendship = async (req: Request, res: Response): Promise<Response> => {
  try {
    const friendships: FriendshipAttributes[] = await friendshipService.getAllFriendship()

    return res.status(200).send({
      status: 200,
      message: message.get_friendship_success,
      data: friendships
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_friendship_faild,
      errors: error
    })
  }
}

//* Completed: get all friendship of the user
export const getAllFriendofTheUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params //* id of user need get data

    //* service get user detail data
    const friendships: FriendshipAttributes[] = await friendshipService.getAllFriendshipOfTheUser(
      id
    )

    return res.status(200).send({
      status: 200,
      message: message.get_friendship_detail_success,
      data: friendships
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.get_friendship_detail_faild,
      errors: error
    })
  }
}

//* Completed: update user (using update & change password)
export const updateFriendship = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      userA,
      userB,
      best_friend,
      block
    }: {
      userA: any
      userB: any
      best_friend: boolean | undefined
      block: boolean | undefined
    } = req.body

    const friendship = await friendshipService.updateFriendship(
      userA.id,
      userB.id,
      best_friend,
      block
    )

    return res.status(200).send({
      status: 200,
      message: message.update_friendship_success,
      data: friendship
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.update_friendship_faild,
      errors: error
    })
  }
}

//* Completed: delete friendship
export const deleteFriendship = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userA_id, userB_id }: { userA_id: string; userB_id: string } = req.body
    const friendship = await friendshipService.deleteFriendship(userA_id, userB_id)

    return res.status(200).send({
      status: 200,
      message: message.delete_friendship_success,
      data: friendship
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: message.delete_friendship_faild,
      errors: error
    })
  }
}
