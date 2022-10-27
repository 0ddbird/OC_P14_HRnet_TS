import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/routes'
import { connect } from './connection/connection'
import bodyParser from 'body-parser'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? '3001'
app.use(cors())
connect()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
