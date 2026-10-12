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

  test('deve retornar undefined (void) ao cadastrar um livro', async () => {
    const output = await sut.cadastrar(livroDTO)
    expect(output).toBeUndefined()
  })
})
