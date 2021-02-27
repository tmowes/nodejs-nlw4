import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors'
import { SurveysUsersRepository } from '../repositories'

export default class AnswersController {
  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    })

    if (!surveyUser) {
      throw new AppError('Survey user does not exist')
    }

    surveyUser.value = Number(value)

    await surveyUserRepository.save(surveyUser)

    return response.json(surveyUser)
  }
}
