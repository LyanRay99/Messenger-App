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

export interface UsersAttributesUpdates
  extends Pick<
    UsersAttributes,
    'password' | 'full_name' | 'sex' | 'address' | 'birthday' | 'phone_number' | 'role' | 'active'
  > {}

export interface UsersAttributesChangePassword {
  old_password: string
  new_password: string
  confirm_password: string
}
