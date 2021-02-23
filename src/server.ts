import 'reflect-metadata'
import express, { json } from 'express'
import cors from 'cors'
import './database'
import routes from './routes'

const app = express()

app.use(cors())
app.use(json())

app.use(routes)

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🚀🚀🚀 Server started on port 3333!!'))
