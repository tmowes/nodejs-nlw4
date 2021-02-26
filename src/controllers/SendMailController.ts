import { Request, Response } from 'express'
import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'
import {
  UsersRepository,
  SurveysRepository,
  SurveysUsersRepository,
} from '../repositories'
import SendMailService from '../services/SendMailService'

export default class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body

    const userRepository = getCustomRepository(UsersRepository)
    const surveyRepository = getCustomRepository(SurveysRepository)
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository)

    const user = await userRepository.findOne({ email })
    if (!user) {
      return response.status(400).json({ message: 'User does not exists' })
    }

    const survey = await surveyRepository.findOne({ id: survey_id })
    if (!survey) {
      return response.status(400).json({ message: 'Survey does not exists' })
    }

    const npsPath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'nps_survey.hbs',
    )

    const variables = {
      user_id: user.id,
      name: user.name,
      title: survey.title,
      description: survey.description,
      link: process.env.BASE_MAIL_URL,
    }

    const surveyUserExists = await surveyUserRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ['user', 'survey'],
    })

    if (surveyUserExists) {
      await SendMailService.execute({
        email,
        subject: survey.title,
        path: npsPath,
        variables,
      })
      return response.json(surveyUserExists)
    }

    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id,
    })

    await surveyUserRepository.save(surveyUser)

    await SendMailService.execute({
      email,
      subject: survey.title,
      path: npsPath,
      variables,
    })

    return response.json(surveyUser)
  }
}
