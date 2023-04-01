import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { MessagesAttributes } from '../../types/messages.type'
// import Users from '../users'
// import MessageStatuses from '../message_status'
import { TableName } from '../../constants/tableName.constant'

export interface MessagesInput extends Optional<MessagesAttributes, 'id'> {}
export interface MessagesOutput extends Required<MessagesAttributes> {}

class Messages extends Model<MessagesAttributes, MessagesInput> implements MessagesAttributes {
  public id!: string
  public sender_id!: string
  public receiver_id!: string
  public content!: string
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ Users, MessageStatuses }: any) {
    this.belongsTo(Users, { foreignKey: 'id' })
    this.hasOne(MessageStatuses, { foreignKey: 'message_id' })
  }
}

Messages.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.Users,
        key: 'id'
      }
    },
    receiver_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.Users,
        key: 'id'
      }
    },
    content: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false
  }
)

export default Messages
