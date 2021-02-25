import { EntityRepository, Repository } from 'typeorm'
import { User } from '../models'

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {}
