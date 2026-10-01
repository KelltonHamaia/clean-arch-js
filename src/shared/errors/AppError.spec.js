const AppError = require('./AppError')

describe('AppError', () => {
  test('AppError é uma instância de Error', () => {
    const appError = new AppError('erro')
    expect(appError).toBeInstanceOf(Error)
  })

  test('AppError possui mensagem correta para falta de dependências', () => {
    const appError = new AppError(AppError.dependencias)
    expect(appError.message).toBe(AppError.dependencias)
  })
})
