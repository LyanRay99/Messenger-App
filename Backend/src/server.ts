import express, { Express, Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import rootRouter from './routers/router'

dotenv.config()

const app: Express = express()

//* convert request & response => json
app.use(express.json())

//* set static file
//* trỏ đường dẫn từ file server.ts (__dirname) => folder Public
const publicPath = path.join(__dirname, './public')
app.use('/public', express.static(publicPath))

app.get('/', (req: Request, res: Response) => {
  res.send("Hello World! I'm Lyan Ray")
})

//* using router
app.use('/api/v1', rootRouter)

const PORT: string | number = process.env.DATABASE_PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
