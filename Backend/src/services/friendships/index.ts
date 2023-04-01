import {
  createFriendship,
  getAllFriendship,
  getAllFriendshipOfTheUser,
  updateFriendship,
  deleteFriendship,
  deleteFriendshipWhenUserIsDeleted
} from './friendship.service'

const friendshipService = {
  createFriendship,
  getAllFriendship,
  getAllFriendshipOfTheUser,
  updateFriendship,
  deleteFriendship,
  deleteFriendshipWhenUserIsDeleted
}

export default friendshipService
