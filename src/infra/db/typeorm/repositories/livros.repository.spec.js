const { livrosRepository, typeormLivrosRepository } = require('./livros.repository')

describe('Livros repository', () => {
  let sut
  beforeAll(() => {
    sut = livrosRepository()
  })

  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido',
  }

  beforeEach(async () => {
    typeormLivrosRepository.deleteAll()
  })

  test('Deve retornar undefined (void) ao cadastrar um livro', async () => {
    const output = await sut.cadastrar(livroDTO)
    expect(output).toBeUndefined()
  })

  test('Deve retornar true caso encontre um livro buscando pelo ISBN', async () => {
    await typeormLivrosRepository.save(livroDTO)
    const output = await sut.existePorISBN('ISBN_valido')

    expect(output).toBe(true)
  })

  test('Deve retornar false caso encontre um livro buscando pelo ISBN', async () => {
    const output = await sut.existePorISBN('ISBN_nao_valido')
    expect(output).toBe(false)
  })

  test('deve retornar o livro caso encontre pelo nome ou ISBN', async () => {
    await typeormLivrosRepository.save(livroDTO)

    const output = await sut.buscarPorNomeOuISBN('nome_valido')
    expect(output).toHaveLength(1)
    expect(output[0].id).toBeDefined()
    expect(output[0].nome).toBe('nome_valido')
  })
})
