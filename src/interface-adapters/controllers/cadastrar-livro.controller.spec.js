const { Either, AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')
const cadastrarLivroController = require('./cadastrar-livro.controller')

describe('Cadastrar Livro controller', () => {
  const cadastrarLivroUseCase = jest.fn()

  test('Deve retornar um httpResponse 201 ao cadastrar um livro com sucesso', async () => {
    const httpRequest = {
      body: {
        nome: 'nome_valido',
        quantidade: 1,
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_JA_CADASTRADO',
      },
    }
    cadastrarLivroUseCase.mockResolvedValue(Either.Right(null))
    const response = await cadastrarLivroController({
      cadastrarLivroUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(201, null))
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1)
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Deve retornar um httpResponse 400 e message se o livro não for cadastrado com sucesso por lógica no usecase ', async () => {
    const httpRequest = {
      body: {
        nome: 'nome_valido',
        quantidade: 1,
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_JA_CADASTRADO',
      },
    }
    cadastrarLivroUseCase.mockResolvedValue(Either.Left({ message: 'Validação inválida' }))
    const response = await cadastrarLivroController({
      cadastrarLivroUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(400, 'Validação inválida'))
    expect(cadastrarLivroUseCase).toHaveBeenCalledTimes(1)
    expect(cadastrarLivroUseCase).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Deve retornar throw AppError se as dependencias não forem fornecidas', () => {
    expect(() => cadastrarLivroController({})).rejects.toThrow(new AppError(AppError.dependencias))
  })
})
