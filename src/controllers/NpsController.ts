import { Request, Response } from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import { SurveysUsersRepository } from '../repositories'

export default class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull()),
    })

    const detractors = surveyUser.filter(
      survey => survey.value >= 0 && survey.value <= 6,
    ).length

    const promoters = surveyUser.filter(
      survey => survey.value >= 9 && survey.value <= 10,
    ).length
    const passives = surveyUser.filter(
      survey => survey.value >= 7 && survey.value <= 8,
    ).length

    const totalAnswers = surveyUser.length

    const calculatedNps = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2),
    )

    return response.json({
      detractors,
      promoters,
      passives,
      calculatedNps,
    })
  }
}
