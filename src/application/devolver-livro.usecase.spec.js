const devolverLivroUseCase = require('./devolver-livro.usecase')

describe('Devolver livro usecase', () => {
  const emprestimosRepository = {
    devolver: jest.fn(),
  }

  test('Deve ser possível devolver um livro sem gerar multa por atraso', async () => {
    const devolverLivroDTO = {
      emprestimo_id: 'id_emprestimo_valido',
      data_devolucao: new Date('2026-10-05'),
    }

    const sut = devolverLivroUseCase({ emprestimosRepository })
    const output = await sut(devolverLivroDTO)

    expect(output.right).toBe('Multa por atraso: R$ 0')
    expect(emprestimosRepository.devolver).toHaveBeenCalledWith(devolverLivroDTO)
    expect(emprestimosRepository.devolver).toHaveBeenCalledTimes(1)
  })
})
