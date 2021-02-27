import { Router } from 'express'
import answerRouter from './answer.routes'
import npsRouter from './nps.routes'
import sendMailRouter from './sendMail.routes'
import surveysRouter from './surveys.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/surveys', surveysRouter)

routes.use('/send-mail', sendMailRouter)
routes.use('/answers', answerRouter)
routes.use('/nps', npsRouter)

export default routes
