const { Either, AppError } = require('../shared/errors')
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

  test('Deve retornar um Either.Left se a data de retorno for menor que a data de saída', async () => {
    const emprestarLivroDataInvalidaDTO = {
      usuario_id: 'usuario_id_VALIDO',
      livro_id: 'livro_id_VALIDO',
      data_saida: new Date('2026-10-02'),
      data_retorno: new Date('2026-10-01'),
    }

    const sut = emprestarLivroUsecase({ emprestimosRepository })
    const output = await sut(emprestarLivroDataInvalidaDTO)

    expect(output.left).toEqual(Either.dataRetornoMenorQueDataSaida())
  })

  test('Não deve permitir o empréstimo de um livro com o mesmo ISBN para o mesmo usuário antes que o livro anterior não tenha sido devolvido', async () => {
    const emprestarLivroDTO = {
      usuario_id: 'usuario_id_VALIDO',
      livro_id: 'livro_id_VALIDO',
      data_saida: new Date('2026-10-01'),
      data_retorno: new Date('2026-10-01'),
    }
    emprestimosRepository.existeLivroISBNEmprestimoPendenteUsuario.mockResolvedValue(true)
    const sut = emprestarLivroUsecase({ emprestimosRepository })
    const output = await sut(emprestarLivroDTO)

    expect(output.left).toEqual(Either.livroISBNEmprestimoPendenteUsuario())
    expect(emprestimosRepository.existeLivroISBNEmprestimoPendenteUsuario).toHaveBeenCalledWith({
      usuario_id: emprestarLivroDTO.usuario_id,
      livro_id: emprestarLivroDTO.livro_id,
    })
    expect(emprestimosRepository.existeLivroISBNEmprestimoPendenteUsuario).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar um throw AppError caso o emprestimosRepository não seja fornecido', () => {
    expect(() => emprestarLivroUsecase({})).toThrow(new AppError(AppError.dependencias))
  })

  test('Deve retornar um throw AppError caso um ou mais campos obrigatórios não sejam fornecidos', async () => {
    const sut = emprestarLivroUsecase({ emprestimosRepository })
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    )
  })
})
