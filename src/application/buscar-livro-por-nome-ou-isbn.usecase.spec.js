const { AppError } = require('../shared/errors')
const buscarLivroPorNomeOuIsbnUsecase = require('./buscar-livro-por-nome-ou-isbn.usecase')

describe('Buscar livro por nome ou ISBN usecase', () => {
  const livrosRepository = {
    buscarLivroPorNomeOuISBN: jest.fn(),
  }

  test('Deve retornar um array de livros válidos ao buscar por nome ou ISBN existentes', async () => {
    const nomeOuISBNDTO = {
      valor: 'valor_valido',
    }

    const outputDTO = [
      {
        nome: 'valor_valido',
        quantidade: 'quantidade_valido',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'ISBN_valido',
      },
    ]
    livrosRepository.buscarLivroPorNomeOuISBN.mockResolvedValue(outputDTO)

    const sut = buscarLivroPorNomeOuIsbnUsecase({ livrosRepository })
    const output = await sut(nomeOuISBNDTO)

    expect(output.right).toEqual(outputDTO)
    expect(livrosRepository.buscarLivroPorNomeOuISBN).toHaveBeenCalledWith(nomeOuISBNDTO.valor)
    expect(livrosRepository.buscarLivroPorNomeOuISBN).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar um array vazio se não existir um livro por nome ou ISBN informados', async () => {
    const nomeOuISBNDTO = {
      valor: 'valor_NOME_ISBN_nao_cadastrado',
    }
    const outputDTO = []
    livrosRepository.buscarLivroPorNomeOuISBN.mockResolvedValue(outputDTO)

    const sut = buscarLivroPorNomeOuIsbnUsecase({ livrosRepository })
    const output = await sut(nomeOuISBNDTO)

    expect(output.right).toEqual(outputDTO)
    expect(livrosRepository.buscarLivroPorNomeOuISBN).toHaveBeenCalledWith(nomeOuISBNDTO.valor)
    expect(livrosRepository.buscarLivroPorNomeOuISBN).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar um throw AppError se o livrosRepository nao for fornecido', () => {
    expect(() => buscarLivroPorNomeOuIsbnUsecase({})).toThrow(new AppError(AppError.dependencias))
  })

  test('Deve retornar um throw AppError quando um ou mais valores obrigatórios não forem fornecidos', async () => {
    const sut = buscarLivroPorNomeOuIsbnUsecase({ livrosRepository })
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    )
  })
})
