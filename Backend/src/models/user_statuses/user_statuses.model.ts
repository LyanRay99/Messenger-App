import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { UserStatusesAttributes } from '../../types/user.type'
// import Users from '../users'
import { TableName } from '../../constants/tableName.constant'

export interface UserStatusesInput extends Optional<UserStatusesAttributes, 'id'> {}
export interface UserStatusesOutput extends Required<UserStatusesAttributes> {}

class UserStatuses extends Model<UserStatusesAttributes, UserStatusesInput> implements UserStatusesAttributes {
  public id!: string
  public user_id!: string
  public status!: boolean
  public last_active!: Date
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ Users }: any) {
    // define association here
    this.belongsTo(Users, { foreignKey: 'id' })
  }
}

UserStatuses.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.Users,
        key: 'id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    last_active: {
      type: DataTypes.DATE,
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
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false
  }
)

export default UserStatuses
