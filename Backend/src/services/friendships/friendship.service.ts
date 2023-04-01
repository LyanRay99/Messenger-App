import { nanoid } from 'nanoid'
import { Op } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { FriendshipAttributes } from '../../types/friendships.type'
import { UsersAttributes } from '../../types/user.type'
import Friendships from '../../models/friendships'

//* Completed: create user status
export const createFriendship = async (
  userA: any,
  userB: any
): Promise<{ friendshipA: FriendshipAttributes; friendshipB: FriendshipAttributes }> => {
  const friendshipA = await Friendships.create({
    id: nanoid(),
    user_id: userA.id,
    friend_id: userB.id,
    status: true,
    best_friend: false,
    block: false
  })

  const friendshipB = await Friendships.create({
    id: nanoid(),
    user_id: userB.id,
    friend_id: userA.id,
    status: true,
    best_friend: false,
    block: false
  })

  return {
    friendshipA,
    friendshipB
  }
}

//* Completed: get all friendship
export const getAllFriendship = async (): Promise<FriendshipAttributes[]> =>
  await Friendships.findAll()

//* Completed: get all friendship of the user
export const getAllFriendshipOfTheUser = async (user_id: string): Promise<FriendshipAttributes[]> =>
  await Friendships.findAll({
    where: {
      user_id: user_id
    }
  })

//* Completed: update friendship
export const updateFriendship = async (
  userA_id: string,
  userB_id: string,
  best_friend?: boolean,
  block?: boolean
): Promise<void> => {
  await sequelizeConnection.transaction(async (t) => {
    await Friendships.update(
      { best_friend: best_friend, block: block },
      {
        where: {
          [Op.or]: [
            { user_id: userA_id, friend_id: userB_id },
            { user_id: userB_id, friend_id: userA_id }
          ]
        },
        transaction: t
      }
    )
  })
}

//* Completed: delete friendship
export const deleteFriendship = async (userA_id: string, userB_id: string): Promise<number> =>
  await Friendships.destroy({
    where: {
      [Op.or]: [
        { user_id: userA_id, friend_id: userB_id },
        { user_id: userB_id, friend_id: userA_id }
      ]
    }
  })

//* Completed: delete friendship when user is deleted
export const deleteFriendshipWhenUserIsDeleted = async (userA_id: string): Promise<number> =>
  await Friendships.destroy({
    where: {
      [Op.or]: [{ user_id: userA_id }, { friend_id: userA_id }]
    }
  })
