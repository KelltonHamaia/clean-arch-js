const { usuariosRepository, typeormUsuariosRepository } = require('./usuarios.repository')

describe('Usuarios repository', () => {
  beforeEach(async () => {
    await typeormUsuariosRepository.deleteAll({})
  })

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

  test('Deve retornar um usuário se o mesmo existir buscando pelo CPF', async () => {
    await typeormUsuariosRepository.save({
      nome_completo: 'NOME_COMPLETO_VALIDO',
      CPF: 'CPF_VALIDO',
      telefone: 'TELEFONE_VALIDO',
      endereco: 'ENDERECO_VALIDO',
      email: 'EMAIL_VALIDO',
    })
    const sut = usuariosRepository()
    const usuarioBuscadoPorCPFCadastrado = await sut.buscarPorCPF('CPF_VALIDO')

    expect(usuarioBuscadoPorCPFCadastrado.id).toBeDefined()
    expect(usuarioBuscadoPorCPFCadastrado.CPF).toBe('CPF_VALIDO')
  })

  test('Deve retornar null se não encontrar um usuário buscando pelo CPF', async () => {
    const sut = usuariosRepository()
    const usuarioNull = await sut.buscarPorCPF('CPF_NAO_CADASTRADO')

    expect(usuarioNull).toBeNull()
  })
})
