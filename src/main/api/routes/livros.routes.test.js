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

  test('Deve ser possível buscar um livro pelo ISBN', async () => {
    const livroDTO = {
      nome: 'nome_valido_teste',
      quantidade: 1,
      autor: 'autor_valido_teste',
      genero: 'genero_valido_teste',
      ISBN: 'ISBN_valido_teste_busca',
    }
    await typeormLivrosRepository.save(livroDTO)

    const { statusCode, body } = await request(app)
      .get('/livros')
      .query({ valor: 'ISBN_valido_teste_busca' })
    expect(statusCode).toBe(200)
    expect(body).toHaveLength(1)
    expect(body[0]).toEqual(expect.objectContaining(livroDTO))
  })

  test('Deve retornar body de length 0 se não encontrar nenhum livro por nome ou isbn', async () => {
    const { statusCode, body } = await request(app)
      .get('/livros')
      .query({ valor: 'NOME_OU_ISBN_NAO_CADASTRADO' })
    expect(statusCode).toBe(200)
    expect(body).toHaveLength(0)
  })

  test('Deve retornar um erro do zod se os campos obrigatórios para cadastrar o livro não forem informados', async () => {
    const { statusCode, body } = await request(app).post('/livros').send({})
    expect(statusCode).toBe(400)
    expect(body.message).toBe('Erro na validação.')
    expect(body.erros.fieldErrors).toEqual({
      nome: ['Campo nome é obrigatório'],
      quantidade: ['Campo quantidade é obrigatório'],
      autor: ['Campo autor é obrigatório'],
      genero: ['Campo genero é obrigatório'],
      ISBN: ['Campo ISBN é obrigatório'],
    })
  })

  test('Deve retornar um erro do zod se o campo valor não for informado para a busca de um livro por nome ou isbn', async () => {
    const { statusCode, body } = await request(app).get('/livros').query()
    expect(statusCode).toBe(400)
    expect(body.message).toBe('Erro na validação.')
    expect(body.erros.fieldErrors).toEqual({
      valor: ['Campo valor é obrigatório'],
    })
  })
})
