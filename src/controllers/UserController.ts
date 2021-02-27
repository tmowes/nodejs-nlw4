import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as yup from 'yup'
import { AppError } from '../errors'
import { UsersRepository } from '../repositories'

export default class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body

    const userSchema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup
        .string()
        .email('Digite um email valido')
        .required('Email é obrigatório'),
    })

    try {
      await userSchema.validate(request.body, { abortEarly: false })
    } catch (error) {
      throw new AppError(JSON.stringify(error))
    }

    const userRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await userRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const user = userRepository.create({ name, email })

    await userRepository.save(user)

    return response.status(201).json(user)
  }
}
