import { Router } from 'express'
import sendMailRouter from './sendMail.routes'
import surveysRouter from './surveys.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/surveys', surveysRouter)

routes.use('/send-mail', sendMailRouter)

export default routes
