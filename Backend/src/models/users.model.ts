import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/db_connect'

interface UsersAttributes {
  id: number
  username: string
  password: string
  email: string
  full_name: string
  sex: boolean
  address: string
  birthday: Date
  phone_number: string
  avatar: string | null
  role: number
  active: boolean
  created_at: Date
  updated_at: Date
}

export interface UsersInput extends Optional<UsersAttributes, 'id'> {}
export interface UsersOutput extends Required<UsersAttributes> {}

class Users extends Model<UsersAttributes, UsersInput> implements UsersAttributes {
  public id!: number
  public username!: string
  public password!: string
  public email!: string
  public full_name!: string
  public sex!: boolean
  public address!: string
  public birthday!: Date
  public phone_number!: string
  public avatar!: string | null
  public role!: number
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
      type: DataTypes.STRING(10),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(100),
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
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false,
    sequelize: sequelizeConnection,
    underscored: false
  }
)

export default Users
