import { Router } from 'express'
import { AnswersController } from '../controllers'

const answerRouter = Router()

const answersController = new AnswersController()

answerRouter.get('/:value', answersController.execute)

export default answerRouter
