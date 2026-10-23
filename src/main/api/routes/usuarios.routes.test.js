const request = require('supertest')
const { app } = require('../app')
const {
  typeormUsuariosRepository,
} = require('../../../infra/db/typeorm/repositories/usuarios.repository')

describe('Usuarios routes', () => {
  beforeEach(async () => {
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
})
