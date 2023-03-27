import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db_Username = process.env.DEV_DATABASE_USERNAME as string
const db_Password = process.env.DEV_DATABASE_PASSWORD
const db_Database = process.env.DEV_DATABASE_NAME as string
const db_Host = process.env.DEV_DATABASE_HOST
const db_Dialect = 'mysql'

//* create connection from server to database
const sequelizeConnection = new Sequelize(db_Database, db_Username, db_Password, {
  host: db_Host,
  dialect: db_Dialect
})

export default sequelizeConnection
