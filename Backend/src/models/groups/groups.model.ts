import { DataTypes, Model, Optional, ForeignKey } from 'sequelize'
import sequelizeConnection from '../../config/db_connect'
import { GroupsAttributes } from '../../types/group.type.'
// import GroupMember from '../group_members'
// import GroupMessages from '../group_messages'

export interface GroupsInput extends Optional<GroupsAttributes, 'id'> {}
export interface GroupsOutput extends Required<GroupsAttributes> {}

class Groups extends Model<GroupsAttributes, GroupsInput> implements GroupsAttributes {
  public id!: string
  public group_name!: string
  public avatar!: string
  public readonly created_at!: Date
  public readonly updated_at!: Date

  static associate({ GroupMember, GroupMessages }: any) {
    this.hasMany(GroupMember, {
      foreignKey: 'group_id'
    })
    this.hasMany(GroupMessages, {
      foreignKey: 'group_id'
    })
  }
}

Groups.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
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

export default Groups
