const { livrosRepository, typeormLivrosRepository } = require('./livros.repository')

describe('Livros repository', () => {
  let sut
  beforeAll(() => {
    sut = livrosRepository()
  })

  const livroDTO = {
    nome: 'nome valido',
    quantidade: 3,
    autor: 'autor valido',
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
    const output = await sut.existePorISBN('ISBN_invalido')

    expect(output).toBe(false)
  })
})
