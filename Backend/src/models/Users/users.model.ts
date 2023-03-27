import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'

interface UsersAttributes {
  id: number
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

export interface UsersInput extends Optional<UsersAttributes, 'id'> {}
export interface UsersOutput extends Required<UsersAttributes> {}

class Users extends Model<UsersAttributes, UsersInput> implements UsersAttributes {
  public id!: number
  public username!: string
  public password!: string
  public email!: string
  public full_name!: string
  public sex!: string
  public address!: string
  public birthday!: Date
  public phone_number!: string
  public avatar!: string
  public role!: string
  public active!: boolean
  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Users.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80'
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Client'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false
  }
)

export default Users
