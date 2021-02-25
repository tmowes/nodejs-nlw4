import request from 'supertest'
import app from '../app'

import createConnection from '../database'

describe('Survey', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })
  it('should be  able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Survey Title Example',
      description: 'Survey Description Example',
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
  it('should be able to show all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'Survey2 Title Example',
      description: 'Survey2 Description Example',
    })

    const response = await request(app).get('/surveys')
    expect(response.body.length).toBe(2)
  })
})
