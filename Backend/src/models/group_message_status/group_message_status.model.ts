import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { GroupMessageStatusAttributes } from '../../types/group.type.'
import GroupMessages from '../group_messages'
import { TableName } from '../../constants/tableName.constant'

export interface GroupMessageStatusInput extends Optional<GroupMessageStatusAttributes, 'id'> {}
export interface GroupMessageStatusOutput extends Required<GroupMessageStatusAttributes> {}

class GroupMessageStatus
  extends Model<GroupMessageStatusAttributes, GroupMessageStatusInput>
  implements GroupMessageStatusAttributes
{
  public id!: string
  public group_message_id!: string
  public read_status!: boolean
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ GroupMessages }: any) {
    this.belongsTo(GroupMessages, {
      foreignKey: 'id'
    })
  }
}

GroupMessageStatus.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    group_message_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.GroupMessages,
        key: 'id'
      }
    },
    read_status: {
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

export default GroupMessageStatus
