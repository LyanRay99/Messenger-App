import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { MessageStatusAttributes } from '../../types/messages.type'
// import Messages from '../messages'
import { TableName } from '../../constants/tableName.constant'

export interface MessageStatusInput extends Optional<MessageStatusAttributes, 'id'> {}
export interface MessageStatusOutput extends Required<MessageStatusAttributes> {}

class MessageStatuses extends Model<MessageStatusAttributes, MessageStatusInput> implements MessageStatusAttributes {
  public id!: string
  public message_id!: string
  public read_status!: boolean
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ Messages }: any) {
    this.belongsTo(Messages, { foreignKey: 'id' })
  }
}

MessageStatuses.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    message_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TableName.Messages,
        key: 'id'
      }
    },
    read_status: {
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
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false
  }
)

export default MessageStatuses
