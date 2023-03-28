export interface UsersAttributes {
  id: string
  username: string
  password: string
  email: string
  full_name: string
  sex: string
  address: string
  birthday: Date
  phone_number: string
  avatar?: string
  role?: string
  active?: boolean
  created_at?: Date
  updated_at?: Date
}
