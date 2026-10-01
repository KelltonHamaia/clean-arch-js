const AppError = require('../shared/errors/AppError.js')
const Either = require('../shared/errors/Either.js')
const cadastrarUsuarioUsecase = require('./cadastrar-usuario.usecase.js')

describe('Cadastrar usuário usecase', () => {
  //Arrange
  const usuariosRepository = {
    cadastrar: jest.fn(),
    existePorCPF: jest.fn(),
  }

  test('Deve poder cadastrar um usuário', async () => {
    /**
     * Conceito: Triple A
     * Arrange: Preparação - Configura o estado inicial para os testes (ex: criar variáveis, funções, etc...)
     * Act: Executar a ação que deve ser testada
     * Assert: Validar os retornos
     */

    //Arrange
    const usuarioDTO = {
      nome_completo: 'nome_completo_VALIDO',
      CPF: 'CPF_VALIDO',
      telefone: 'telefone_VALIDO',
      endereco: 'endereco_VALIDO',
      email: 'email_VALIDO',
    }
    /* System under test => normalmente é o nome dado ao componente que queremos testar */
    // ACT
    const sut = cadastrarUsuarioUsecase({ usuariosRepository })
    const output = await sut(usuarioDTO)

    //ASSERTS
    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO)
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1)
    expect(output.right).toBeNull()
  })

  test('Deve retornar throw AppError se o usuarioRepository não for fornecido', () => {
    expect(() => cadastrarUsuarioUsecase({})).toThrow(new AppError(AppError.dependencias))
  })

  test('Deve retornar um throw AppError se um ou mais campos obrigatórios não forem fornecidos', async () => {
    const sut = cadastrarUsuarioUsecase({ usuariosRepository })
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    )
  })

  test('Deve retornar um throw AppError se já existir um usuário cadastrado com o CPF', async () => {
    const usuarioDTO = {
      nome_completo: 'nome_completo_VALIDO',
      CPF: 'CPF_ja_cadastrado',
      telefone: 'telefone_VALIDO',
      endereco: 'endereco_VALIDO',
      email: 'email_VALIDO',
    }

    usuariosRepository.existePorCPF.mockResolvedValue(true)

    const sut = cadastrarUsuarioUsecase({ usuariosRepository })
    const output = await sut(usuarioDTO)

    expect(output.right).toBeNull()
    expect(output.left).toEqual(Either.valorJaCadastrado('CPF'))
    expect(usuariosRepository.existePorCPF).toHaveBeenCalledWith(usuarioDTO.CPF)
    expect(usuariosRepository.existePorCPF).toHaveBeenCalledTimes(1)
  })
})
