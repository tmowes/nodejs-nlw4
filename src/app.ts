import 'reflect-metadata'
import express, { json } from 'express'
import cors from 'cors'
import createConnection from './database'
import routes from './routes'

createConnection()

const app = express()

app.use(cors())
app.use(json())

app.use(routes)

export default app
