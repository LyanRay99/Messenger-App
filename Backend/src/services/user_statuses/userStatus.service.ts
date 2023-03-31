import { nanoid } from 'nanoid'
import UserStatuses from '../../models/user_statuses'
import { UserStatusesAttributes } from '../../types/user.type'

//* Completed: create user status
export const createUserStatus = async (ID: string): Promise<UserStatusesAttributes> =>
  await UserStatuses.create({
    id: nanoid(),
    user_id: ID,
    status: false,
    last_active: new Date(Date.now())
  })

//* Completed: get all user status
export const getAllUserStatus = async (): Promise<UserStatusesAttributes[]> =>
  await UserStatuses.findAll()

//* Completed: get detail user status
export const getUserStatusDetail = async (user_id: string): Promise<UserStatusesAttributes> =>
  //* find data user by id
  (await UserStatuses.findOne({
    where: {
      user_id
    }
  })) as UserStatusesAttributes

//* Completed: update user status
export const updateUserStatus = async (userStatus: UserStatusesAttributes): Promise<void> => {
  await UserStatuses.update(
    {
      status: !userStatus.status,
      last_active: new Date(Date.now())
    },
    {
      where: {
        user_id: userStatus.user_id
      }
    }
  )
}

//* Completed: delete user status
export const deleteUserStatus = async (id: string): Promise<number> =>
  await UserStatuses.destroy({
    where: {
      user_id: id
    }
  })

//* TODO: check relation user A & user B to get detail user data
