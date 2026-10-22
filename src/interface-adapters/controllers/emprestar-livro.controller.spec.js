const { ZodError } = require('zod')
const { Either, AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')
const emprestarLivroController = require('./emprestar-livro.controller')

describe('Emprestar livro controller', () => {
  const emprestarLivroUseCase = jest.fn()

  test('Deve ser possível emprestar um livro ', async () => {
    const httpRequest = {
      body: {
        usuario_id: 1,
        livro_id: 1,
        data_saida: '2026-10-21',
        data_retorno: '2026-10-27',
      },
    }

    emprestarLivroUseCase.mockResolvedValue(Either.Right(null))
    const response = await emprestarLivroController({ emprestarLivroUseCase, httpRequest })

    expect(response).toEqual(httpResponse(201, null))
    expect(emprestarLivroUseCase).toHaveBeenCalledWith({
      usuario_id: 1,
      livro_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date),
    })
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar httpResponse 400 e Error.message se o empréstimo não for realizado com sucesso por lógica do usecase ', async () => {
    const httpRequest = {
      body: {
        usuario_id: 1,
        livro_id: 1,
        data_saida: '2026-10-21',
        data_retorno: '2026-10-20',
      },
    }

    emprestarLivroUseCase.mockResolvedValue(Either.Left({ message: 'Validação inválida' }))
    const response = await emprestarLivroController({ emprestarLivroUseCase, httpRequest })

    expect(response).toEqual(httpResponse(400, 'Validação inválida'))
    expect(emprestarLivroUseCase).toHaveBeenCalledWith({
      usuario_id: 1,
      livro_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date),
    })
    expect(emprestarLivroUseCase).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar um erro se o EmprestarLivroUseCase e o httpRequest não forem fornecidos', async () => {
    await expect(() => emprestarLivroController({})).rejects.toEqual(
      new AppError(AppError.dependencias),
    )
  })

  test('Deve retornar um ZodError se os campos obrigatórios não forem fornecidos', async () => {
    const httpRequest = {
      body: {},
    }

    await expect(() =>
      emprestarLivroController({ emprestarLivroUseCase, httpRequest }),
    ).rejects.toBeInstanceOf(ZodError)
  })
})
