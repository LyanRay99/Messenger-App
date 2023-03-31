export interface FriendshipAttributes {
  id: string
  user_id: string
  friend_id: string
  status: boolean
  best_friend: boolean
  block: boolean
  created_at?: Date
  updated_at?: Date
}
