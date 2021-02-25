import { Router } from 'express'
import surveysRouter from './surveys.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/surveys', surveysRouter)

export default routes
