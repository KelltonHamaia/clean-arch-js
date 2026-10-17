const { Either } = require('../../shared/errors')
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
})
