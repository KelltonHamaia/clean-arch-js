const { Either } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')
const devolverLivroController = require('./devolver-livro.controller')

describe('Devolver Livro controller', () => {
  const devolverLivroUseCase = jest.fn()

  test('Deve retornar uma mensagem ao devolver um livro informando uma multa ou não', async () => {
    const httpRequest = {
      body: {
        data_devolucao: '2026-10-21',
      },
      params: {
        emprestimo_id: 1,
      },
    }

    devolverLivroUseCase.mockResolvedValue(Either.Right('Multa por atraso: R$ 0'))

    const response = await devolverLivroController({
      devolverLivroUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(200, 'Multa por atraso: R$ 0'))
    expect(devolverLivroUseCase).toHaveBeenCalledTimes(1)
    expect(devolverLivroUseCase).toHaveBeenCalledWith({
      ...httpRequest.body,
      ...httpRequest.params,
    })
  })
})
