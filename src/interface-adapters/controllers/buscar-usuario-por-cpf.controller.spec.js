const { ZodError } = require('zod')
const { Either, AppError } = require('../../shared/errors')
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

  test('Deve retornar um httpResponse 200 e null se não encontrar um usuário', async () => {
    buscarUsuarioPorCPFUseCase.mockResolvedValue(Either.Right(null))
    const httpRequest = {
      params: {
        CPF: '000.000.000-09',
      },
    }
    const response = await buscarUsuarioPorCpfController({
      buscarUsuarioPorCPFUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(200, null))
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledTimes(1)
    expect(buscarUsuarioPorCPFUseCase).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Deve retornar um throw AppError se as dependencias não forem fornecidas', async () => {
    await expect(() => buscarUsuarioPorCpfController({})).rejects.toThrow(
      new AppError(AppError.dependencias),
    )
  })

  test('Deve retornar um ZodError caso o erro lançado seja de validação do Zod pelo campo CPF não ter sido informado corretamente', async () => {
    const httpRequestErro = {
      params: {
        CPF: 'CPF_INVALIDO',
      },
    }

    await expect(() =>
      buscarUsuarioPorCpfController({
        buscarUsuarioPorCPFUseCase,
        httpRequest: httpRequestErro,
      }),
    ).rejects.toBeInstanceOf(ZodError)
  })
})
