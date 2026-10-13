const { emprestimosRepository, typeormEmprestimosRepository } = require('./emprestimos.repository')
const { typeormLivrosRepository } = require('./livros.repository')
const { typeormUsuariosRepository } = require('./usuarios.repository')

describe('Emprestimos repository', () => {
  let sut
  const usuarioDTO = {
    nome_completo: 'NOME_COMPLETO_VALIDO',
    CPF: 'CPF_VALIDO',
    telefone: 'TELEFONE_VALIDO',
    endereco: 'ENDERECO_VALIDO',
    email: 'EMAIL_VALIDO',
  }
  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido',
  }

  beforeAll(async () => {
    sut = emprestimosRepository()
  })

  test('Deve retornar undefined (void) ao retornar um emprestimo', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save(usuarioDTO),
      typeormLivrosRepository.save(livroDTO),
    ])

    const output = await sut.emprestar({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2026-10-12',
      data_retorno: '2026-10-13',
    })

    expect(output).toBeUndefined()
  })

  test('Deve retornar a data de retorno salva no banco de dados corretamente', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save(usuarioDTO),
      typeormLivrosRepository.save(livroDTO),
    ])

    const emprestimo = await typeormEmprestimosRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2026-10-12',
      data_retorno: '2026-10-12',
    })

    const output = await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2026-10-12',
    })

    expect(output.data_retorno).toBe(emprestimo.data_retorno)
  })
})
