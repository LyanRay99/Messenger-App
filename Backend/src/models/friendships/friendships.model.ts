import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { FriendshipAttributes } from '../../types/friendships.type'
// import Users from '../users'
import { TableName } from '../../constants/tableName.constant'

export interface FriendshipsInput extends Optional<FriendshipAttributes, 'id'> {}
export interface FriendshipsOutput extends Required<FriendshipAttributes> {}

class Friendships
  extends Model<FriendshipAttributes, FriendshipsInput>
  implements FriendshipAttributes
{
  public id!: string
  public user_id!: string
  public friend_id!: string
  public status!: boolean
  public best_friend!: boolean
  public block!: boolean
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ Users }: any) {
    this.belongsTo(Users, { foreignKey: 'id' })
  }
}

Friendships.init(
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
    friend_id: {
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
    best_friend: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    block: {
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

export default Friendships
