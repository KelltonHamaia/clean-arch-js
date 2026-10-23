const request = require('supertest')
const {
  typeormLivrosRepository,
} = require('../../../infra/db/typeorm/repositories/livros.repository')
const {
  typeormUsuariosRepository,
} = require('../../../infra/db/typeorm/repositories/usuarios.repository')
const { app } = require('../app')
const {
  typeormEmprestimosRepository,
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository')

describe('Emprestimos routes', () => {
  beforeEach(async () => {
    await typeormEmprestimosRepository.query('DELETE FROM emprestimos')
    await typeormUsuariosRepository.query('DELETE FROM usuarios')
    await typeormLivrosRepository.query('DELETE FROM livros')
  })

  test('Deve ser possível emprestar um livro', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save({
        nome_completo: 'nome_completo_valido',
        CPF: '123.456.789-09',
        telefone: 'telefone_valido',
        endereco: 'endereco_valido',
        email: 'emailvalido@gmail.com',
      }),
      typeormLivrosRepository.save({
        nome: 'nome_valido',
        quantidade: 1,
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_valido',
      }),
    ])

    const { statusCode, body } = await request(app).post('/emprestimos').send({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2026-10-23',
      data_retorno: '2026-10-24',
    })

    expect(statusCode).toBe(201)
    expect(body).toBeNull()
  }, 150000)
})
