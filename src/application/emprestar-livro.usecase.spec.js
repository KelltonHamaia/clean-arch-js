const emprestarLivroUsecase = require('./emprestar-livro.usecase')

describe('Emprestar livro UseCase', () => {
  const emprestimosRepository = {
    existeLivroISBNEmprestimoPendenteUsuario: jest.fn(),
    emprestar: jest.fn(),
  }

  test('Deve poder emprestar um livro', async () => {
    const emprestarLivroDTO = {
      usuario_id: 'usuario_id_VALIDO',
      livro_id: 'livro_id_VALIDO',
      data_saida: new Date('2026-10-01'),
      data_retorno: new Date('2026-10-01'),
    }

    const sut = emprestarLivroUsecase({ emprestimosRepository })
    const output = await sut(emprestarLivroDTO)

    expect(output.right).toBeNull()
    expect(emprestimosRepository.existeLivroISBNEmprestimoPendenteUsuario).toHaveBeenCalledWith({
      usuario_id: emprestarLivroDTO.usuario_id,
      livro_id: emprestarLivroDTO.livro_id,
    })
    expect(emprestimosRepository.emprestar).toHaveBeenCalledWith(emprestarLivroDTO)
    expect(emprestimosRepository.emprestar).toHaveBeenCalledTimes(1)
  })
})
