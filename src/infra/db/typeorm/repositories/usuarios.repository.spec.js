const { usuariosRepository } = require('./usuarios.repository')

describe('Usuarios repository', () => {
  test('Deve retornar void ao criar um usuário', async () => {
    const sut = usuariosRepository()
    const usuarioCriado = await sut.cadastrar({
      nome_completo: 'NOME_COMPLETO_VALIDO',
      CPF: 'CPF_VALIDO',
      telefone: 'TELEFONE_VALIDO',
      endereco: 'ENDERECO_VALIDO',
      email: 'EMAIL_VALIDO',
    })

    expect(usuarioCriado).toBeUndefined()
  })
})
