const { AppError, Either } = require('../shared/errors')
const cadastrarLivroUseCase = require('./cadastrar-livro.usecase')

describe('Cadastrar livro usecase', () => {
  const livrosRepository = {
    cadastrar: jest.fn(),
    existePorISBN: jest.fn(),
  }

  test('Deve pode cadastrar um livro', async () => {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valido',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido',
    }

    const sut = cadastrarLivroUseCase({ livrosRepository })
    const output = await sut(livroDTO)

    expect(output.right).toBeNull()
    expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDTO)
    expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar um throw AppError caso o LivrosRepository não seja fornecido', () => {
    expect(() => cadastrarLivroUseCase({})).toThrow(new AppError(AppError.dependencias))
  })

  test('Deve retornar um throw AppError caso estejam faltando um ou mais campos', async () => {
    const sut = cadastrarLivroUseCase({ livrosRepository })
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    )
  })

  test('Deve retornar um Either.Left.valorJaCastrado se já existir um ISBN cadastrado para um livro', async () => {
    livrosRepository.existePorISBN.mockResolvedValue(true)

    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valido',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_JA_CADASTRADO',
    }

    const sut = cadastrarLivroUseCase({ livrosRepository })
    const output = await sut(livroDTO)

    expect(output.left).toBe(Either.valorJaCadastrado('ISBN'))
    expect(livrosRepository.existePorISBN).toHaveBeenCalledWith(livroDTO.ISBN)
    expect(livrosRepository.existePorISBN).toHaveBeenCalledTimes(1)
  })
})
