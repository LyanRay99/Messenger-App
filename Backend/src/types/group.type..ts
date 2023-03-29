export interface GroupsAttributes {
  id: string
  group_name: string
  avatar: string
  created_at?: Date
  updated_at?: Date
}

export interface GroupMemberAttributes {
  id: string
  group_id: string
  user_id: string
  role: string
  created_at?: Date
  updated_at?: Date
}

export interface GroupMessagesAttributes {
  id: string
  group_id: string
  sender_id: string
  content: string
  created_at?: Date
  updated_at?: Date
}

export interface GroupMessageStatusAttributes {
  id: string
  group_message_id: string
  read_status: boolean
  created_at?: Date
  updated_at?: Date
}
