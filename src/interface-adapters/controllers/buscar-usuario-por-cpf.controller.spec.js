const { Either } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')
const buscarUsuarioPorCpfController = require('./buscar-usuario-por-cpf.controller')

describe('Buscar usuario por CPF controller', () => {
  const buscarUsuarioPorCPFUseCase = jest.fn()

  test('Deve retornar httpResponse 200 e um usuário se o mesmo for encontrado', async () => {
    const usuarioDTO = {
      id: 'id_valido',
      nome_completo: 'nome_valido',
      CPF: '123.456.789-09',
      endereco: 'endereco_valido',
      telefone: 'telefone_valido',
      email: 'email_valido@gmail.com',
    }

    buscarUsuarioPorCPFUseCase.mockResolvedValue(Either.Right(usuarioDTO))
    const httpRequest = {
      params: {
        CPF: '123.456.789-09',
      },
    }
    const response = await buscarUsuarioPorCpfController({
      buscarUsuarioPorCPFUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(200, usuarioDTO))
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledTimes(1)
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledWith(httpRequest.params)
  })
})
