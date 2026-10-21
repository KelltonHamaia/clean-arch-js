const { ZodError } = require('zod')
const { Either, AppError } = require('../../shared/errors')
const httpResponse = require('../../shared/helpers/http.response')
const buscarLivroPorNomeOuIsbnController = require('./buscar-livro-por-nome-ou-isbn.controller')

describe('Buscar livro por nome ou ISBN controller', () => {
  const buscarLivroPorNomeOuISBNUseCase = jest.fn()

  test('Deve retornar httpReponse 200 e os livros se forem encontrados com o valor informado', async () => {
    const httpRequest = {
      query: {
        valor: 'nome_valido',
      },
    }
    const livrosDTO = [
      {
        id: 'id_valido',
        nome: 'nome_valido',
        quantidade: 3,
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_valido',
      },
    ]
    buscarLivroPorNomeOuISBNUseCase.mockResolvedValue(Either.Right(livrosDTO))

    const response = await buscarLivroPorNomeOuIsbnController({
      buscarLivroPorNomeOuISBNUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(200, livrosDTO))
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledTimes(1)
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledWith(httpRequest.query)
  })

  test('Deve retornar httpReponse 200 e um array vazio de livros se nenhum livro for encontrados com o valor informado', async () => {
    const httpRequest = {
      query: {
        valor: 'ISBN_NAO_CADASTRADO',
      },
    }
    buscarLivroPorNomeOuISBNUseCase.mockResolvedValue(Either.Right([]))

    const response = await buscarLivroPorNomeOuIsbnController({
      buscarLivroPorNomeOuISBNUseCase,
      httpRequest,
    })

    expect(response).toEqual(httpResponse(200, []))
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledTimes(1)
    expect(buscarLivroPorNomeOuISBNUseCase).toHaveBeenCalledWith(httpRequest.query)
  })

  test('Deve retornar um throw AppError se as dependencias não forem informadas', async () => {
    await expect(() => buscarLivroPorNomeOuIsbnController({})).rejects.toThrow(
      new AppError(AppError.dependencias),
    )
  })

  test('Deve retornar um ZodError se os campos de busca não forem informados corretamente', async () => {
    const httpRequest = {
      query: {},
    }

    await expect(() =>
      buscarLivroPorNomeOuIsbnController({ buscarLivroPorNomeOuISBNUseCase, httpRequest }),
    ).rejects.toBeInstanceOf(ZodError)
  })
})
