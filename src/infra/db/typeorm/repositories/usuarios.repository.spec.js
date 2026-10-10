const { usuariosRepository, typeormUsuariosRepository } = require('./usuarios.repository')

describe('Usuarios repository', () => {
  let sut = null
  beforeEach(async () => {
    await typeormUsuariosRepository.deleteAll({})
  })

  beforeAll(() => {
    sut = usuariosRepository()
  })

  const usuarioDTO = {
    nome_completo: 'NOME_COMPLETO_VALIDO',
    CPF: 'CPF_VALIDO',
    telefone: 'TELEFONE_VALIDO',
    endereco: 'ENDERECO_VALIDO',
    email: 'EMAIL_VALIDO',
  }

  test('Deve retornar void ao criar um usuário', async () => {
    const usuarioCriado = await sut.cadastrar(usuarioDTO)

    expect(usuarioCriado).toBeUndefined()
  })

  test('Deve retornar um usuário se o mesmo existir buscando pelo CPF', async () => {
    await typeormUsuariosRepository.save(usuarioDTO)
    const usuarioBuscadoPorCPFCadastrado = await sut.buscarPorCPF('CPF_VALIDO')

    expect(usuarioBuscadoPorCPFCadastrado.id).toBeDefined()
    expect(usuarioBuscadoPorCPFCadastrado.CPF).toBe('CPF_VALIDO')
  })

  test('Deve retornar null se não encontrar um usuário buscando pelo CPF', async () => {
    const usuarioNull = await sut.buscarPorCPF('CPF_NAO_CADASTRADO')

    expect(usuarioNull).toBeNull()
  })

  test('Deve retornar true caso encontre um usuário buscando pelo CPF', async () => {
    await typeormUsuariosRepository.save(usuarioDTO)
    const existePorCPF = await sut.existePorCPF('CPF_VALIDO')

    expect(existePorCPF).toBe(true)
  })

  test('Deve retornar false caso não encontre um usuário buscando pelo CPF', async () => {
    const existePorCPF = await sut.existePorCPF('CPF_NAO_CADASTRADO')
    expect(existePorCPF).toBe(false)
  })

  test('Deve retornar true caso encontre um usuário buscando pelo EMAIL', async () => {
    await typeormUsuariosRepository.save(usuarioDTO)
    const existePorCPF = await sut.existePorEmail('EMAIL_VALIDO')

    expect(existePorCPF).toBe(true)
  })

  test('Deve retornar true caso não encontre um usuário buscando pelo EMAIL', async () => {
    const existePorCPF = await sut.existePorEmail('EMAIL_VALIDO')

    expect(existePorCPF).toBe(false)
  })
})
