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

  test('Deve ser possível buscar um livro pelo nome', async () => {
    const livroDTO = {
      nome: 'nome_valido_teste_busca',
      quantidade: 1,
      autor: 'autor_valido_teste',
      genero: 'genero_valido_teste',
      ISBN: 'ISBN_valido_teste',
    }
    await typeormLivrosRepository.save(livroDTO)

    const { statusCode, body } = await request(app)
      .get('/livros')
      .query({ valor: 'nome_valido_teste_busca' })
    expect(statusCode).toBe(200)
    expect(body).toHaveLength(1)
    expect(body[0]).toEqual(expect.objectContaining(livroDTO))
  })
})
