const request = require('supertest')
const { app } = require('../app')
const {
  typeormUsuariosRepository,
} = require('../../../infra/db/typeorm/repositories/usuarios.repository')
const {
  typeormEmprestimosRepository,
} = require('../../../infra/db/typeorm/repositories/emprestimos.repository')

describe('Usuarios routes', () => {
  beforeEach(async () => {
    await typeormEmprestimosRepository.query('DELETE FROM emprestimos')
    await typeormUsuariosRepository.query('DELETE FROM usuarios')
  })

  test('Deve ser possível cadastrar um usuário', async () => {
    const { statusCode, body } = await request(app).post('/usuarios').send({
      nome_completo: 'nome valido',
      CPF: '123.123.123-12',
      endereco: 'endereco valido',
      telefone: 'telefone valido',
      email: 'emailvalido@gmail.com',
    })

    expect(statusCode).toBe(201)
    expect(body).toBeNull()
  })

  test('Deve retornar um erro com os campos obrigatórios ausentes', async () => {
    const { statusCode, body } = await request(app).post('/usuarios').send({})
    expect(statusCode).toBe(400)
    expect(body.message).toBe('Erro na validação.')
    expect(body.erros.fieldErrors).toEqual({
      nome_completo: ['Campo nome_completo é obrigatório'],
      CPF: ['Campo CPF é obrigatório'],
      telefone: ['Campo telefone é obrigatório'],
      endereco: ['Campo endereco é obrigatório'],
      email: ['Campo email é obrigatório'],
    })
  })

  test('Deve retornar um usuário ao buscar pelo CPF', async () => {
    const usuarioDTO = {
      nome_completo: 'nome_valido',
      CPF: '123.123.123-12',
      endereco: 'endereco_valido',
      telefone: 'telefone_valido',
      email: 'emailvalido@gmail.com',
    }
    await typeormUsuariosRepository.save(usuarioDTO)
    const { statusCode, body } = await request(app).get('/usuarios/cpf/123.123.123-12')

    expect(statusCode).toBe(200)
    expect(body.id).toBeDefined()
    expect(body).toEqual(expect.objectContaining(usuarioDTO))
  })

  test('Deve retornar null se ao buscar pelo CPF não não encontrar um usuário', async () => {
    const { statusCode, body } = await request(app).get('/usuarios/cpf/000.000.000-00')

    expect(statusCode).toBe(200)
    expect(body).toBeNull()
  })

  test('Deve verificar se o CPF foi passado corretamente para o params', async () => {
    const { statusCode, body } = await request(app).get('/usuarios/cpf/0')
    expect(statusCode).toBe(400)
    expect(body.erros.fieldErrors).toEqual({
      CPF: ['CPF inválido'],
    })
  })
})
