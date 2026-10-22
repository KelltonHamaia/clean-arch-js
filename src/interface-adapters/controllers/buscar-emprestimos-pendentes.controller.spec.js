const buscarPendentes = require('../../../tests/fixtures/buscar-pendentes')
const { Either, AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')
const buscarEmprestimosPendentesController = require('./buscar-emprestimos-pendentes.controller')

describe('Buscar emprestimos pendentes controller', () => {
  const buscarEmprestimosPendentesUseCase = jest.fn()
  test('Deve retornar um httpResponse 200 e os emprestimos pendentes', async () => {
    buscarEmprestimosPendentesUseCase.mockResolvedValue(Either.Right(buscarPendentes))
    const response = await buscarEmprestimosPendentesController({
      buscarEmprestimosPendentesUseCase,
    })

    expect(response).toEqual(httpResponse(200, buscarPendentes))
    expect(buscarEmprestimosPendentesUseCase).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar um throw AppError caso as dependencias do buscarEmprestimosPendentesController não forem informadas ', async () => {
    await expect(() => buscarEmprestimosPendentesController({})).rejects.toThrow(
      new AppError(AppError.dependencias),
    )
  })
})
