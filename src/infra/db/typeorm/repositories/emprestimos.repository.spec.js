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

  beforeEach(async () => {
    await typeormEmprestimosRepository.deleteAll()
    await typeormLivrosRepository.deleteAll()
    await typeormUsuariosRepository.deleteAll()
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

    const { data_retorno } = await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2026-10-12',
    })

    expect(data_retorno).toBe(emprestimo.data_retorno)
  })

  test('Deve atualizar a data de devolução no banco de dados corretamente', async () => {
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

    await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2026-10-12',
    })

    const emprestimoAtualizado = await typeormEmprestimosRepository.findOneBy({ id: emprestimo.id })
    expect(emprestimoAtualizado.data_devolucao).toBe('2026-10-12')
  })

  test('Deve retornar os empréstimos pendentes', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save(usuarioDTO),
      typeormLivrosRepository.save(livroDTO),
    ])
    await typeormEmprestimosRepository.save([
      {
        usuario_id: usuario.id,
        livro_id: livro.id,
        data_saida: '2026-10-12',
        data_retorno: '2026-10-12',
        data_devolucao: '2026-10-13',
      },
      {
        usuario_id: usuario.id,
        livro_id: livro.id,
        data_saida: '2026-10-12',
        data_retorno: '2026-10-12',
      },
    ])

    const output = await sut.buscarPendentesComLivroComUsuario()
    expect(output).toHaveLength(1)
    expect(output[0].id).toBeDefined()
    expect(output[0].data_saida).toBe('2026-10-12')
    expect(output[0].data_retorno).toBe('2026-10-12')
    expect(output[0].data_devolucao).toBeUndefined()
    expect(output[0].usuario.nome_completo).toBe('NOME_COMPLETO_VALIDO')
    expect(output[0].livro.nome).toBe('nome_valido')
  })

  test('Deve retornar true se existir um empréstimo pendente para o usuário e o livro', async () => {
    const [usuario, livro] = await Promise.all([
      typeormUsuariosRepository.save(usuarioDTO),
      typeormLivrosRepository.save(livroDTO),
    ])

    await typeormEmprestimosRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2026-10-12',
      data_retorno: '2026-10-12',
    })
    const output = await sut.existeLivroISBNEmprestadoPendenteUsuario({
      usuario_id: usuario.id,
      livro_id: livro.id,
    })

    expect(output).toBe(true)
  })

  test('Deve retornar false se não existir um empréstimo pendente para o usuário e o livro', async () => {
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

    await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2026-10-12',
    })

    const output = await sut.existeLivroISBNEmprestadoPendenteUsuario({
      usuario_id: usuario.id,
      livro_id: livro.id,
    })

    expect(output).toBe(false)
  })
})
