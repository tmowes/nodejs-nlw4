import { Router } from 'express'
import { SendMailController } from '../controllers'

const sendMailRouter = Router()

const sendMailController = new SendMailController()

sendMailRouter.post('/', sendMailController.execute)

export default sendMailRouter
