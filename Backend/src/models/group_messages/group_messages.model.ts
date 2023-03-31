import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { GroupMessagesAttributes } from '../../types/group.type.'
import Groups from '../groups/groups.model'
import Users from '../users'
import GroupMessageStatus from '../group_message_status'
import { TableName } from '../../constants/tableName.constant'

export interface GroupMessagesInput extends Optional<GroupMessagesAttributes, 'id'> {}
export interface GroupMessagesOutput extends Required<GroupMessagesAttributes> {}

class GroupMessages extends Model<GroupMessagesAttributes, GroupMessagesInput> implements GroupMessagesAttributes {
  public id!: string
  public group_id!: string
  public sender_id!: string
  public content!: string
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ Groups, Users, GroupMessageStatus }: any) {
    this.belongsTo(Groups, {
      foreignKey: 'id'
    })
    this.belongsTo(Users, {
      foreignKey: 'id'
    })
    this.hasOne(GroupMessageStatus, {
      foreignKey: 'message_id'
    })
  }
}

GroupMessages.init(
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
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.Users,
        key: 'id'
      }
    },
    content: {
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

export default GroupMessages
