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

jest.setTimeout(20000)

describe('Emprestimos routes', () => {
  beforeEach(async () => {
    await typeormEmprestimosRepository.query('DELETE FROM emprestimos')
    await typeormUsuariosRepository.query('DELETE FROM usuarios')
    await typeormLivrosRepository.query('DELETE FROM livros')
  })

  const usuarioDTO = {
    nome_completo: 'nome_completo_valido',
    CPF: '123.456.789-09',
    telefone: 'telefone_valido',
    endereco: 'endereco_valido',
    email: 'emailvalido@gmail.com',
  }
  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 1,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido',
  }

  test('Deve ser possível emprestar um livro', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save(usuarioDTO),
      typeormLivrosRepository.save(livroDTO),
    ])

    const { statusCode, body } = await request(app).post('/emprestimos').send({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2026-10-23',
      data_retorno: '2026-10-24',
    })

    expect(statusCode).toBe(201)
    expect(body).toBeNull()
  })

  test('Deve rotornar 200 e a mensagem de multa não aplicada', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save(usuarioDTO),
      typeormLivrosRepository.save(livroDTO),
    ])

    const emprestimo = await typeormEmprestimosRepository.save({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2026-10-23',
      data_retorno: '2026-10-24',
    })

    const { statusCode, body } = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({
        data_devolucao: '2026-10-24',
      })

    expect(statusCode).toBe(200)
    expect(body).toBe('Multa por atraso: R$ 0')
  })

  test('Deve rotornar 200 e a mensagem de multa aplicada', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save(usuarioDTO),
      typeormLivrosRepository.save(livroDTO),
    ])

    const emprestimo = await typeormEmprestimosRepository.save({
      livro_id: livro.id,
      usuario_id: usuario.id,
      data_saida: '2026-10-23',
      data_retorno: '2026-10-24',
    })

    const { statusCode, body } = await request(app)
      .put(`/emprestimos/devolver/${emprestimo.id}`)
      .send({
        data_devolucao: '2026-10-25',
      })

    expect(statusCode).toBe(200)
    expect(body).toBe('Multa por atraso: R$ 10,00')
  })

  test('Deve retornar um erro caso os campos obrigatórios não tenham sido informados', async () => {
    const { statusCode, body } = await request(app).put(`/emprestimos/devolver/99`).send({})
    expect(statusCode).toBe(400)
    expect(body.erros.fieldErrors).toEqual({
      data_devolucao: ['Campo data_devolucao é obrigatório'],
    })
  })
})
