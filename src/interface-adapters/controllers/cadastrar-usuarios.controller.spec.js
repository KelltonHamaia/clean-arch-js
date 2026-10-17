const { Either, AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')
const cadastrarUsuariosController = require('./cadastrar-usuarios.controller')

describe('Cadastrar usuario controller', () => {
  const cadastrarUsuarioUseCase = jest.fn()

  test('Deve retornar um httpResponse 201 se o cadastro for realizado com sucesso', async () => {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Right(null))
    const httpRequest = {
      body: {
        nome_completo: 'nome_completo_valido',
        CPF: 'cpf_valido',
        telefone: 'telefone_valido',
        endereco: 'endereco_valido',
        email: 'email_valido',
      },
    }
    const response = await cadastrarUsuariosController({
      cadastrarUsuarioUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(201, null))
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1)
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Deve retornar um throw AppError se o cadastrarUsuarioUseCase e o httpRequest não forem fornecidos', async () => {
    await expect(() => cadastrarUsuariosController({})).rejects.toThrow(
      new AppError(AppError.dependencias),
    )
  })

  test('Deve retornar um httpResponse 400 e error.message se o cadastro de usuário não for realizado com sucesso por lógica do useCase', async () => {
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Left({ message: 'Lógica inválida' }))
    const httpRequest = {
      body: {
        nome_completo: 'nome_completo_valido',
        CPF: 'cpf_valido',
        telefone: 'telefone_valido',
        endereco: 'endereco_valido',
        email: 'email_valido',
      },
    }
    const response = await cadastrarUsuariosController({
      cadastrarUsuarioUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(400, 'Lógica inválida'))
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1)
    expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpRequest.body)
  })
})
