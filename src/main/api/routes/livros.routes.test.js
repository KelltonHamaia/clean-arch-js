const request = require('supertest')
const { app } = require('../app')
const {
  typeormLivrosRepository,
} = require('../../../infra/db/typeorm/repositories/livros.repository')

describe('Livros routes', () => {
  beforeEach(async () => {
    await typeormLivrosRepository.query('DELETE FROM livros')
  })
  test('Deve ser possível cadastrar um livro', async () => {
    const httpRequest = {
      body: {
        nome: 'nome_valido',
        quantidade: 1,
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_valido',
      },
    }

    const { statusCode, body } = await request(app).post('/livros').send(httpRequest.body)
    expect(statusCode).toBe(201)
    expect(body).toBeNull()
  })
})
