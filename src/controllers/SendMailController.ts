import { Request, Response } from 'express'
import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors'
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
      throw new AppError('User does not exists')
    }

    const survey = await surveyRepository.findOne({ id: survey_id })
    if (!survey) {
      throw new AppError('Survey does not exists')
    }

    const npsPath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'nps_survey.hbs',
    )

    const surveyUserExists = await surveyUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey'],
    })

    const variables = {
      id: '',
      name: user.name,
      title: survey.title,
      description: survey.description,
      link: process.env.BASE_MAIL_URL,
    }

    if (surveyUserExists) {
      variables.id = surveyUserExists.id
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
    variables.id = surveyUser.id
    await SendMailService.execute({
      email,
      subject: survey.title,
      path: npsPath,
      variables,
    })

    return response.json(surveyUser)
  }
}
