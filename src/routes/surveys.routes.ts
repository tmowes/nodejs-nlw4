import { Router } from 'express'
import { SurveyController } from '../controllers'

const surveysRouter = Router()

const surveyController = new SurveyController()

surveysRouter.get('/', surveyController.show)
surveysRouter.post('/', surveyController.create)

export default surveysRouter
