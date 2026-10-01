const AppError = require('../shared/errors/AppError.js')
const cadastrarUsuarioUsecase = require('./cadastrar-usuario.usecase.js')

describe('Cadastrar usuário usecase', () => {
  const usuariosRepository = {
    cadastrar: jest.fn(),
  }

  test('Deve poder cadastrar um usuário', async () => {
    const usuarioDTO = {
      nome_completo: 'nome_completo_VALIDO',
      CPF: 'CPF_VALIDO',
      telefone: 'telefone_VALIDO',
      endereco: 'endereco_VALIDO',
      email: 'email_VALIDO',
    }
    /* System under test => normalmente é o nome dado ao componente que queremos testar */
    const sut = cadastrarUsuarioUsecase({ usuariosRepository })
    const output = await sut(usuarioDTO)

    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO)
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1)
    expect(output).toBeUndefined()
  })

  test('Deve retornar throw AppError se o usuarioRepository não for fornecido ', () => {
    expect(() => cadastrarUsuarioUsecase({})).toThrow(
      new AppError(AppError.dependencias),
    )
  })
})
