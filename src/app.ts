/* eslint-disable no-console */
import 'reflect-metadata'
import cors from 'cors'
import express, { json, Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import createConnection from './database'
import { AppError } from './errors'
import routes from './routes'

createConnection()

const app = express()

app.use(cors())
app.use(json())

app.use(routes)

app.use(
  (err: Error, _request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'Error',
        message: err.message,
      })
    }

    console.log(err)
    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    })
  },
)

export default app
