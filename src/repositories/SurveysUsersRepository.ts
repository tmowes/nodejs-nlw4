import { EntityRepository, Repository } from 'typeorm'
import { SurveyUser } from '../models'

@EntityRepository(SurveyUser)
export default class SurveysUsersRepository extends Repository<SurveyUser> {}
