export interface MessagesAttributes {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at?: Date
  updated_at?: Date
}

export interface MessageStatusAttributes {
  id: string
  message_id: string
  read_status: boolean
  created_at?: Date
  updated_at?: Date
}
