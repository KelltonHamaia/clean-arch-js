const { Either } = require('../../shared/errors')
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
})
