import { EntityRepository, Repository } from 'typeorm'
import { Survey } from '../models'

@EntityRepository(Survey)
export default class SurveysRepository extends Repository<Survey> {}
