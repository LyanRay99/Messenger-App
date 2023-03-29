import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { GroupMemberAttributes } from '../../types/group.type.'
import Groups from '../groups/groups.model'
import Users from '../users/users.model'
import { TableName } from '../../constants/tableName.constant'

export interface GroupMemberInput extends Optional<GroupMemberAttributes, 'id'> {}
export interface GroupMemberOutput extends Required<GroupMemberAttributes> {}

class GroupMember extends Model<GroupMemberAttributes, GroupMemberInput> implements GroupMemberAttributes {
  public id!: string
  public group_id!: string
  public user_id!: string
  public role!: string
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ Users, Groups }: any) {
    this.belongsTo(Users, {
      foreignKey: 'id'
    })
    this.belongsTo(Groups, {
      foreignKey: 'id'
    })
  }
}

GroupMember.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    group_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.Groups,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.Users,
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING,
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

export default GroupMember
